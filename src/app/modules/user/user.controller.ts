import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./user.interface";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body, req.query as Record<string, string>);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: user
    });
});

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;

    const result = await UserService.getMe(decodedToken);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Your profile retrieved successfully",
        data: result
    })
})


export const UserController = {
    createUser,
    getMe
};