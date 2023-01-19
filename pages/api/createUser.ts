import type { NextApiRequest, NextApiResponse } from "next";
import { EmailConfig } from "next-auth/providers";
import prisma from "../../lib/prisma";

type User = {
  name: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { name, email } = req.body;

  try {
    const userResult = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(200).json(userResult);
  } catch (error) {
    console.log(error);
  }
}
