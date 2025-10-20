import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PurchaseService } from "./purchase.service";


const purchaseBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedUser = req.user;
    const result = await PurchaseService.purchaseBook(req.body, decodedUser);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Book purchased successfully",
        data: result
    });
});


export const PurchaseController = {
    purchaseBook
};