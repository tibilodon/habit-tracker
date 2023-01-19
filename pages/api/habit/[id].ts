import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

interface Data {
  // id: number;
  title: string;
  content: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const habitId = Number(req.query.id);
  // console.log("habitId:", typeof noteId);
  const { title, content } = req.body;

  try {
    //del
    if (req.method === "DELETE") {
      const habit = await prisma.habit.delete({
        //@ts-ignore
        where: { id: habitId },
      });
      res.json(habit);
    }

    //update
    else if (req.method === "PUT") {
      const habit = await prisma.habit.update({
        where: { id: habitId },
        data: {
          title,
          content,
        },
      });
      //@ts-ignore

      res.status(200).json({ message: "habit updated" });
    }
  } catch (error) {
    console.log("API ERROR:", error);
    //@ts-ignore
    res.status(400).json({ message: "habit could not be modified" });
  }
}
