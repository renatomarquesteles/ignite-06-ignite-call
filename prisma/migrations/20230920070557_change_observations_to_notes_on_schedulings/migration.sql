/*
  Warnings:

  - You are about to drop the column `observations` on the `schedulings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `schedulings` DROP COLUMN `observations`,
    ADD COLUMN `notes` VARCHAR(191) NULL;
