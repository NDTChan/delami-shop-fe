import { createCookieSessionStorage } from "@remix-run/node";

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

export async function createColorSchemeSession(remixColorScheme: string) {
  const session = await storage.getSession();
  session.set("mantine-color-scheme", remixColorScheme);
}

function getColorSchemeSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getColorSchemeValue(request: Request) {
  const session = await getColorSchemeSession(request);
  const colorScheme = session.get("mantine-color-scheme");

  if (!colorScheme || typeof colorScheme !== "string") return undefined;
  return colorScheme;
}
