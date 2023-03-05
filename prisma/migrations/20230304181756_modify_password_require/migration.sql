/*
  Warnings:

  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `fk_cart_user`;

-- DropForeignKey
ALTER TABLE `cart_item` DROP FOREIGN KEY `fk_cart_item_cart`;

-- DropForeignKey
ALTER TABLE `cart_item` DROP FOREIGN KEY `fk_cart_item_product`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `fk_category_parent`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `fk_order_user`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `fk_order_item_order`;

-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `fk_order_item_product`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `fk_product_user`;

-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `fk_pc_category`;

-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `fk_pc_product`;

-- DropForeignKey
ALTER TABLE `product_meta` DROP FOREIGN KEY `fk_meta_product`;

-- DropForeignKey
ALTER TABLE `product_review` DROP FOREIGN KEY `fk_review_parent`;

-- DropForeignKey
ALTER TABLE `product_review` DROP FOREIGN KEY `fk_review_product`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `fk_transaction_order`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `fk_transaction_user`;

-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_ROLE_ID`;

-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_USER_ID`;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `user_roles_user_id_idx` ON `user_roles`(`user_id`);
