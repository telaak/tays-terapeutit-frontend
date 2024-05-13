/*
  Warnings:

  - You are about to drop the column `extrainfoTypes` on the `Therapist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Therapist" DROP COLUMN "extrainfoTypes",
ADD COLUMN     "extraInfoTypes" TEXT[];
