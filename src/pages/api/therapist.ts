import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET": {
      const therapists = await prisma.therapist.findMany();
      return res.json(therapists);
    }
    case "POST": {
      if (req.query.postSecret !== global.process.env.POST_SECRET) {
        return res.status(401).json({ message: "Invalid token" });
      }
      const therapist: Prisma.TherapistCreateInput = req.body;
      try {
        const upsert = await prisma.therapist.upsert({
          create: therapist,
          update: therapist,
          where: {
            fullName: therapist.fullName,
          },
        });
        return res.status(201).json(upsert);
      } catch (error) {
        console.log(error)
        return res.status(500).send(error);
      }
    }
    default:
      return res.status(405).send("Invalid method");
  }
}
