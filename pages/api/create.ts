import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
  habit: { title: string; content: string; userEmail: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    habit: { title, content, userEmail },
  } = req.body;
  try {
    const result = await prisma.habit.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
    //@ts-ignore

    res.status(200).json({ message: "Created" });
  } catch (error) {
    console.log(error);
  }
}
