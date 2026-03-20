import { Request, Response } from "express";
import { getUserRepositories } from "../services/github-api";

export async function UserRepositories(req: Request, res: Response) {
  if (req.method != 'POST') return;
  const { username } = req.body;
  try {
    const result = await getUserRepositories(username.trim());
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(501).json({
      status: "error",
      message: err?.message || "an error ocurred!!",
    });
  }
}
