import { prisma } from "~/utils/prisma.server";

export async function getCategoryList() {
  let includeObject: any = {
    include: { children: true },
  };
  let pointer = includeObject.include;
  for (let i = 0; i < 2; i++) {
    pointer.children = { include: { children: true } };
    pointer = pointer.children.include;
  }
  return prisma.category.findUnique({
    where: { id: 1 },

    include: includeObject.include,
  });
}
