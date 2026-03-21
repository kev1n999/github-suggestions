import { Router } from "express";
import { UserRepositories } from "../controllers/repositories.user";
import { getFeedback } from "../controllers/ideas";

export const router = Router();

router.post("/user-repos", UserRepositories);
router.post("/project-ideas", getFeedback);
