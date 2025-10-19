import { Types } from "mongoose";

export enum ReferralStatus {
    PENDING = 'PENDING',
    CONVERTED = 'CONVERTED',
};


export interface IReferral {
    _id?: Types.ObjectId;
    referrerUser: Types.ObjectId;
    referredUser: Types.ObjectId;
    status: ReferralStatus;
    createdAt?: Date;
    updatedAt?: Date;
};