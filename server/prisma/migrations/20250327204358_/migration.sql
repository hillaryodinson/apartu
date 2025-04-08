-- CreateEnum
CREATE TYPE "RentalType" AS ENUM ('whole', 'room');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "rentalType" "RentalType" NOT NULL DEFAULT 'whole';
