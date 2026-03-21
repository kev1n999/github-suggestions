import { Request, Response } from "express";
import { getGroqChatCompletion } from "../services/groq-api";
import { getUserRepositories } from "../services/github-api";

export async function getFeedback(req: Request, res: Response) {
  const data = req.body;
  try {
    const repositories = await getUserRepositories(data.username.trim());
    const groq_response_feedback = await getGroqChatCompletion(JSON.stringify(repositories), 'FEEDBACK');
    const groq_response_ideas = await getGroqChatCompletion(JSON.stringify(repositories), 'PROJECT-IDEAS');
    return res.status(200).json({
      "feedback": groq_response_feedback.choices[0]?.message?.content || "error",
      "ideas": groq_response_ideas.choices[0]?.message?.content || "error",
    });
  } catch (err: any) {
    return res.status(501).json({
      status: "error",
      message: err?.message || "an error ocurred!!",
    });
  }
}
