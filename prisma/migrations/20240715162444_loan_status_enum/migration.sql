-- AlterTable
ALTER TABLE `loan` ADD COLUMN `status` ENUM('PENDING', 'ACTIVE', 'OVERDUE', 'RETURNED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
