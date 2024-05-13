/*
  Warnings:

  - A unique constraint covering the columns `[fullName]` on the table `Therapist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Therapist_fullName_key" ON "Therapist"("fullName");
