import { Router } from "express";
import { homeController } from "../controllers/home";

export const router = Router();

router.get("/", homeController);
