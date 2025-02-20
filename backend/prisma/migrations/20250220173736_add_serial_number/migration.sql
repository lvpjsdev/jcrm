/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Key` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serialNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Key" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Key_serialNumber_key" ON "Key"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_serialNumber_key" ON "User"("serialNumber");
