-- CreateTable
CREATE TABLE `cart` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NULL,
    `sessionId` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,
    `firstName` VARCHAR(50) NULL,
    `middleName` VARCHAR(50) NULL,
    `lastName` VARCHAR(50) NULL,
    `mobile` VARCHAR(15) NULL,
    `email` VARCHAR(50) NULL,
    `line1` VARCHAR(50) NULL,
    `line2` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `province` VARCHAR(50) NULL,
    `country` VARCHAR(50) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `content` TEXT NULL,

    INDEX `idx_cart_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_item` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `cartId` BIGINT NOT NULL,
    `sku` VARCHAR(100) NOT NULL,
    `price` FLOAT NOT NULL DEFAULT 0,
    `discount` FLOAT NOT NULL DEFAULT 0,
    `quantity` SMALLINT NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `content` TEXT NULL,

    INDEX `idx_cart_item_cart`(`cartId`),
    INDEX `idx_cart_item_product`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `parentId` BIGINT NULL,
    `title` VARCHAR(75) NOT NULL,
    `metaTitle` VARCHAR(100) NULL,
    `slug` VARCHAR(100) NOT NULL,
    `content` TEXT NULL,

    INDEX `idx_category_parent`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NULL,
    `sessionId` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NOT NULL,
    `status` SMALLINT NOT NULL DEFAULT 0,
    `subTotal` FLOAT NOT NULL DEFAULT 0,
    `itemDiscount` FLOAT NOT NULL DEFAULT 0,
    `tax` FLOAT NOT NULL DEFAULT 0,
    `shipping` FLOAT NOT NULL DEFAULT 0,
    `total` FLOAT NOT NULL DEFAULT 0,
    `promo` VARCHAR(50) NULL,
    `discount` FLOAT NOT NULL DEFAULT 0,
    `grandTotal` FLOAT NOT NULL DEFAULT 0,
    `firstName` VARCHAR(50) NULL,
    `middleName` VARCHAR(50) NULL,
    `lastName` VARCHAR(50) NULL,
    `mobile` VARCHAR(15) NULL,
    `email` VARCHAR(50) NULL,
    `line1` VARCHAR(50) NULL,
    `line2` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `province` VARCHAR(50) NULL,
    `country` VARCHAR(50) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `content` TEXT NULL,

    INDEX `idx_order_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_item` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `orderId` BIGINT NOT NULL,
    `sku` VARCHAR(100) NOT NULL,
    `price` FLOAT NOT NULL DEFAULT 0,
    `discount` FLOAT NOT NULL DEFAULT 0,
    `quantity` SMALLINT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `content` TEXT NULL,

    INDEX `idx_order_item_order`(`orderId`),
    INDEX `idx_order_item_product`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `title` VARCHAR(75) NOT NULL,
    `metaTitle` VARCHAR(100) NULL,
    `slug` VARCHAR(100) NOT NULL,
    `summary` TINYTEXT NULL,
    `type` SMALLINT NOT NULL DEFAULT 0,
    `sku` VARCHAR(100) NOT NULL,
    `price` FLOAT NOT NULL DEFAULT 0,
    `discount` FLOAT NOT NULL DEFAULT 0,
    `quantity` SMALLINT NOT NULL DEFAULT 0,
    `shop` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `publishedAt` DATETIME(0) NULL,
    `startsAt` DATETIME(0) NULL,
    `endsAt` DATETIME(0) NULL,
    `content` TEXT NULL,

    UNIQUE INDEX `uq_slug`(`slug`),
    INDEX `idx_product_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `productId` BIGINT NOT NULL,
    `categoryId` BIGINT NOT NULL,

    INDEX `idx_pc_category`(`categoryId`),
    INDEX `idx_pc_product`(`productId`),
    PRIMARY KEY (`productId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_meta` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `key` VARCHAR(50) NOT NULL,
    `content` TEXT NULL,

    INDEX `idx_meta_product`(`productId`),
    UNIQUE INDEX `uq_product_meta`(`productId`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `parentId` BIGINT NULL,
    `title` VARCHAR(100) NOT NULL,
    `rating` SMALLINT NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL,
    `publishedAt` DATETIME(0) NULL,
    `content` TEXT NULL,

    INDEX `idx_review_parent`(`parentId`),
    INDEX `idx_review_product`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `orderId` BIGINT NOT NULL,
    `code` VARCHAR(100) NOT NULL,
    `type` SMALLINT NOT NULL DEFAULT 0,
    `mode` SMALLINT NOT NULL DEFAULT 0,
    `status` SMALLINT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `content` TEXT NULL,

    INDEX `idx_transaction_order`(`orderId`),
    INDEX `idx_transaction_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `user_id` BIGINT NOT NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `FK_ROLE_ID`(`role_id`),
    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,
    `is_enabled` BIT(1) NOT NULL DEFAULT b'1',
    `mobile` VARCHAR(15) NULL,

    UNIQUE INDEX `uq_email`(`email`),
    UNIQUE INDEX `uq_mobile`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_item` ADD CONSTRAINT `fk_cart_item_cart` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart_item` ADD CONSTRAINT `fk_cart_item_product` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `fk_category_parent` FOREIGN KEY (`parentId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `fk_order_item_order` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `fk_order_item_product` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_product_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `fk_pc_category` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `fk_pc_product` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_meta` ADD CONSTRAINT `fk_meta_product` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_review` ADD CONSTRAINT `fk_review_parent` FOREIGN KEY (`parentId`) REFERENCES `product_review`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_review` ADD CONSTRAINT `fk_review_product` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `fk_transaction_order` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `fk_transaction_user` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `FK_ROLE_ID` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `FK_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

