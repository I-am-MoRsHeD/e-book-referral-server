import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { StatsService } from "./stats.service";



const getReferralOverview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const verifiedUser = req.user;
    const result = await StatsService.getReferralOverview(verifiedUser as JwtPayload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Referral stats retrieved successfully",
        data: result
    });
});


export const StatsController = {
    getReferralOverview
}