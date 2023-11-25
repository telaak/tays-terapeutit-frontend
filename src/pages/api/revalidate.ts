import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.secret !== global.process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    await res.revalidate(req.query.path as string);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send({ error: "Error revalidating" });
  }
}
