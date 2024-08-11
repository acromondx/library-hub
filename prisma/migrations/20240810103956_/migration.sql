/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `emailverificationtoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `emailverificationtoken` DROP FOREIGN KEY `EmailVerificationToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`,
    DROP COLUMN `picture`,
    ADD COLUMN `hasChangedDefaultPassword` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `profilePicture` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `emailverificationtoken`;

-- DropTable
DROP TABLE `session`;
