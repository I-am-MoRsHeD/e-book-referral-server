import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.route";
import { purchaseRoutes } from "../modules/purchase/purchase.route";
import { statsRoutes } from "../modules/stats/stats.route";


export const router = Router();


const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/purchase',
        route: purchaseRoutes
    },
    {
        path: '/stats',
        route: statsRoutes
    },
];


moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
})