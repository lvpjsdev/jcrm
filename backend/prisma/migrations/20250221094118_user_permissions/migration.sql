-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('ALL', 'BLOCK_USERS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blockedAt" TIMESTAMP(3),
ADD COLUMN     "permissions" "UserPermission"[];
