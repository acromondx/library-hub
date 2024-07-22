/*
  Warnings:

  - You are about to drop the `reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_userId_fkey`;

-- AlterTable
ALTER TABLE `loan` MODIFY `loanedAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `reservation`;
