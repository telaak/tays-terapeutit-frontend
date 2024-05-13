/*
  Warnings:

  - You are about to drop the column `contactInfoId` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `therapyInfoId` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the `ContactInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TherapyInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Therapist" DROP CONSTRAINT "Therapist_contactInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Therapist" DROP CONSTRAINT "Therapist_therapyInfoId_fkey";

-- AlterTable
ALTER TABLE "Therapist" DROP COLUMN "contactInfoId",
DROP COLUMN "therapyInfoId",
ADD COLUMN     "additionalInfo" TEXT[],
ADD COLUMN     "email" TEXT,
ADD COLUMN     "extraInfo" TEXT[],
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "targetGroups" TEXT[];

-- DropTable
DROP TABLE "ContactInfo";

-- DropTable
DROP TABLE "TherapyInfo";
