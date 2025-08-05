/*
  Warnings:

  - Added the required column `bankCardId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Profile" ALTER COLUMN "avatarImage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "bankCardId" INTEGER NOT NULL;
