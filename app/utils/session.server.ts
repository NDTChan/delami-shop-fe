import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { db } from "./db.server";
import { users } from "@prisma/client";
import _ from "lodash";

type LoginForm = {
  input: string;
  password: string;
};

type RegisterForm = {
  mobile: string;
  email: string;
  password: string;
};

export async function register({ mobile, email, password }: RegisterForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.users.create({
    data: { mobile, email, password: passwordHash },
  });
  return user;
}

export async function login({ input, password }: LoginForm) {
  const users = await db.$queryRaw<
    users[]
  >`SELECT * FROM users WHERE email=${input} OR mobile=${input}`;

  if (_.isArray(users) && users.length === 0) return null;
  const isCorrectPassword = await bcrypt.compare(password, users[0].password);
  if (!isCorrectPassword) return null;
  return users[0];
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "bigint") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await db.users.findUnique({
      where: { id: userId },
    });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: bigint, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
