/*
  Warnings:

  - The `rentalType` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "rentalType",
ADD COLUMN     "rentalType" TEXT NOT NULL DEFAULT 'whole';

-- DropEnum
DROP TYPE "RentalType";
