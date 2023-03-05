import { RegisterForm } from "~/interfaces/auth";
import { db } from "~/utils/db.server";

export async function getUserByPhoneOrEmail(input: string) {
  return await db.users.findMany({
    where: {
      OR: [{ email: input }, { mobile: input }],
    },
  });
}

export async function getUserByMobile(mobile: string) {
  return await db.users.findUnique({
    where: { mobile },
  });
}

export async function getUserByEmail(email: string) {
  return await db.users.findUnique({
    where: { email },
  });
}

export async function createUser({
  mobile,
  email,
  password,
  fullName,
}: RegisterForm) {
  const user = await db.users.create({
    data: { mobile, email, password, fullName, user_roles: {
      create:[
        {
          roles: {
            connect: {
              id: 2
            }
          }
        }
      ]
    } },
  });
  return user;
}
