-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'ADMIN',

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baby` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NULL,
    `statusBBperU` ENUM('SEVERELY_UNDERWEIGHT', 'UNDERWEIGHT', 'NORMAL', 'OVERWEIGHT', 'SEVERELY_OVERWEIGHT') NULL,
    `statustBperU` ENUM('SEVERELY_STUNTED', 'STUNTED', 'NORMAL', 'OVERHEIGHT', 'SEVERELY_OVERHEIGHT') NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baby_condition` (
    `id` VARCHAR(191) NOT NULL,
    `baby_id` VARCHAR(191) NOT NULL,
    `month` ENUM('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER') NOT NULL,
    `weight` DOUBLE NOT NULL,
    `height` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `baby` ADD CONSTRAINT `baby_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `baby_condition` ADD CONSTRAINT `baby_condition_baby_id_fkey` FOREIGN KEY (`baby_id`) REFERENCES `baby`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
