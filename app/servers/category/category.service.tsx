import { getCategoryList } from "./category.data";
export async function getMainCategory() {
  return await getCategoryList();
}
