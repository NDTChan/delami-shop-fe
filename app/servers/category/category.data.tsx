import { prisma } from "~/utils/prisma.server";

function recursive(level: number): any {
  if (level === 0) {
    return {
      include: {
        children: true,
      },
    };
  }
  return {
    include: {
      children: recursive(level - 1),
    },
  };
}

export async function getCategoryList() {
  return prisma.category.findUnique({
    where: { id: 1 },

    include: {
      children: recursive(3),
    },
  });
}
