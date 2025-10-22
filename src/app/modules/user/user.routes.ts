import { Router } from "express";
import { validateSchema } from "../../middleware/validateSchema";
import { createUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { checkAuth } from "../../utils/checkAuth";


const router = Router();

router.get('/me', checkAuth(), UserController.getMe);

router.post('/register',
    validateSchema(createUserZodSchema),
    UserController.createUser);

export const userRoutes = router;