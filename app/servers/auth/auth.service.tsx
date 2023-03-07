import bcrypt from "bcryptjs";
import _ from "lodash";
import { LoginForm, RegisterForm } from "~/interfaces/auth";
import { createUser, getUserByPhoneOrEmail } from "./auth.data";

export async function register({
  mobile,
  email,
  password,
  fullName,
}: RegisterForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  return createUser({ mobile, email, password: passwordHash, fullName });
}

export async function login({ input, password }: LoginForm) {
  const users = await getUserByPhoneOrEmail(input);

  if (_.isArray(users) && users.length === 0) return null;
  const isCorrectPassword = await bcrypt.compare(password, users[0].password);
  if (!isCorrectPassword) return null;
  return users[0];
}
