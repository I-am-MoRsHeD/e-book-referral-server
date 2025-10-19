import { Types } from "mongoose";



export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    referralCode: string;
    referredBy?: Types.ObjectId;
    role: "USER";
};