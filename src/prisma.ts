import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getTherapists() {
  const therapists = await prisma.therapist.findMany({
    orderBy: {
      lastName: "asc",
    },
  });
  return therapists
}
