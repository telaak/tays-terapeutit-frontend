-- CreateTable
CREATE TABLE "TherapyInfo" (
    "id" SERIAL NOT NULL,
    "languages" TEXT[],
    "targetGroups" TEXT[],
    "additionalInfo" TEXT[],

    CONSTRAINT "TherapyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" SERIAL NOT NULL,
    "extraInfo" TEXT[],
    "phoneNumber" TEXT,
    "email" TEXT,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Therapist" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "extrainfoTypes" TEXT[],
    "jobTitle" TEXT,
    "reception" TEXT[],
    "education" TEXT[],
    "spaceAvailable" TEXT NOT NULL,
    "therapyInfoId" INTEGER NOT NULL,
    "contactInfoId" INTEGER NOT NULL,

    CONSTRAINT "Therapist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Therapist" ADD CONSTRAINT "Therapist_therapyInfoId_fkey" FOREIGN KEY ("therapyInfoId") REFERENCES "TherapyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Therapist" ADD CONSTRAINT "Therapist_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
