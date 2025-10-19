import { Router } from "express";
import { validateSchema } from "../../middleware/validateSchema";
import { createUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";


const router = Router();

router.post('/register',
    validateSchema(createUserZodSchema),
    UserController.createUser);

export const userRoutes = router;