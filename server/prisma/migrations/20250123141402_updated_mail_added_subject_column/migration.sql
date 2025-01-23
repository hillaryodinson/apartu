/*
  Warnings:

  - Added the required column `subject` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mail" ADD COLUMN     "subject" TEXT NOT NULL;
