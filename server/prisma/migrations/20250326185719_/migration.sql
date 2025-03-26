/*
  Warnings:

  - Changed the type of `type` on the `Attribute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `valueType` on the `Attribute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "valueType",
ADD COLUMN     "valueType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AttributeType";

-- DropEnum
DROP TYPE "AttributeValueType";
