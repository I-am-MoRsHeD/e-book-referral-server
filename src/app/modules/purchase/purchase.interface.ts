import { Types } from "mongoose";



export interface IPurchase {
    _id?: Types.ObjectId;
    bookName: string;
    price: number;
    purchasedBy : Types.ObjectId;
};