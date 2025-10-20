import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { StatsController } from "./stats.controller";

const router = Router();

router.get('/', checkAuth(), StatsController.getReferralOverview);



export const statsRoutes = router;