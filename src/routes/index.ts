import { Router } from "express";
import { UserRepositories } from "../controllers/repositories.user";
import { getFeedback } from "../controllers/feedback";

export const router = Router();

router.post("/user-repos", UserRepositories);
router.post("/feedback", getFeedback);
