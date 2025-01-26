/*
  Warnings:

  - The primary key for the `Lease` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `type` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `rentDuration` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RentPaymentCycle" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "PropType" AS ENUM ('HOUSE', 'APARTMENT_COMPLEX');

-- AlterTable
ALTER TABLE "Lease" DROP CONSTRAINT "Lease_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lease_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lease_id_seq";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "type",
ADD COLUMN     "type" "PropType" NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "rentCycle" "RentPaymentCycle" NOT NULL DEFAULT 'YEARLY',
ADD COLUMN     "rentDuration" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "PropertyType";
