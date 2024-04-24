import { z } from "zod";

const quizSchema = z.object({
  name: z.string({ message: "Enter name of quiz" }),
  tags: z.array(z.string({ message: "Tags are required" })),
  date: z.string({ message: "Date is required" }),
  startTime: z.string({ message: "Start time is required" }),
  endTime: z.string({ message: "End time is required" }),
  questions: z.array(
    z.object({
      text: z.string({ message: "Enter question title" }),
      options: z.array(z.string({ message: "options missing" })).length(4),
    })
  ),
});

export default quizSchema;
