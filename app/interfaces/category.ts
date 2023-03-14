import { category } from "@prisma/client";

export type CategoryMain = category & {
  children: CategoryMain[];
};
