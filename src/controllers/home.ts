import { Request, Response } from "express";

export async function homeController(req: Request, res: Response) {
  return res.send("Hello World!");
}
