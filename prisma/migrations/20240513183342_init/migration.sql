/*
  Warnings:

  - Added the required column `fullName` to the `Therapist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "fullName" TEXT NOT NULL;
