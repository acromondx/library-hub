/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` ADD COLUMN `sessionToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_sessionToken_key` ON `Session`(`sessionToken`);

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `Session_userId_fkey` TO `Session_userId_idx`;
