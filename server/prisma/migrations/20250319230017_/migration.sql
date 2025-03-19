-- CreateEnum
CREATE TYPE "AttributeValueType" AS ENUM ('boolean', 'number', 'string');

-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('property', 'unit');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "categoryId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "type" "AttributeType" NOT NULL,
    "valueType" "AttributeValueType" NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitAttribute" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "UnitAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAttribute" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,

    CONSTRAINT "PropertyAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UnitToUnitAttribute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UnitToUnitAttribute_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AttributeToUnitAttribute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AttributeToUnitAttribute_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");

-- CreateIndex
CREATE INDEX "_UnitToUnitAttribute_B_index" ON "_UnitToUnitAttribute"("B");

-- CreateIndex
CREATE INDEX "_AttributeToUnitAttribute_B_index" ON "_AttributeToUnitAttribute"("B");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAttribute" ADD CONSTRAINT "PropertyAttribute_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAttribute" ADD CONSTRAINT "PropertyAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UnitToUnitAttribute" ADD CONSTRAINT "_UnitToUnitAttribute_A_fkey" FOREIGN KEY ("A") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UnitToUnitAttribute" ADD CONSTRAINT "_UnitToUnitAttribute_B_fkey" FOREIGN KEY ("B") REFERENCES "UnitAttribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToUnitAttribute" ADD CONSTRAINT "_AttributeToUnitAttribute_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToUnitAttribute" ADD CONSTRAINT "_AttributeToUnitAttribute_B_fkey" FOREIGN KEY ("B") REFERENCES "UnitAttribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
