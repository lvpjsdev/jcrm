/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "period" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeysOnUsers" (
    "userId" TEXT NOT NULL,
    "keyId" TEXT NOT NULL,

    CONSTRAINT "KeysOnUsers_pkey" PRIMARY KEY ("userId","keyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_key_key" ON "Key"("key");

-- AddForeignKey
ALTER TABLE "KeysOnUsers" ADD CONSTRAINT "KeysOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeysOnUsers" ADD CONSTRAINT "KeysOnUsers_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "Key"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
