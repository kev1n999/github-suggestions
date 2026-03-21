import { Router } from "express";
import { homeController } from "../controllers/home";
import { UserRepositories } from "../controllers/repositories.user";
import { getFeedback } from "../controllers/feedback";

export const router = Router();

router.get("/", homeController);
router.post("/user-repos", UserRepositories);
router.post("/feedback", getFeedback);
