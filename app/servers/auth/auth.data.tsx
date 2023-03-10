import { ROLE } from "~/constants/role.const";
import { RegisterForm } from "~/interfaces/auth";
import { prisma } from "~/utils/prisma.server";

export async function getUserByPhoneOrEmail(input: string) {
  return await prisma.users.findMany({
    where: {
      OR: [{ email: input }, { mobile: input }],
    },
  });
}

export async function getUserByMobile(mobile: string) {
  return await prisma.users.findUnique({
    where: { mobile },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: { email },
  });
}

export async function createUser({
  mobile,
  email,
  password,
  fullName,
}: RegisterForm) {
  const user = await prisma.users.create({
    data: {
      mobile,
      email,
      password,
      fullName,
      image: "/images/avatar.jpg",
      user_roles: {
        create: [
          {
            roles: {
              connect: {
                id: ROLE.USER,
              },
            },
          },
        ],
      },
    },
  });
  return user;
}
