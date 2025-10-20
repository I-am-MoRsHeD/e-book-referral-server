import { Router } from "express";
import { validateSchema } from "../../middleware/validateSchema";
import { purchaseBookSchema } from "./purchase.validation";
import { checkAuth } from "../../utils/checkAuth";
import { PurchaseController } from "./purchase.controller";


const router = Router();


router.post('/',
    checkAuth(),
    validateSchema(purchaseBookSchema),
    PurchaseController.purchaseBook);


export const purchaseRoutes = router;