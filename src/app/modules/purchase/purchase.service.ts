import { JwtPayload } from "jsonwebtoken";
import { IPurchase } from "./purchase.interface";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import { Purchase } from "./purchase.model";
import { Referral } from "../referral/referral.model";
import { ReferralStatus } from "../referral/referral.interface";
import { Types } from "mongoose";


const purchaseBook = async (payload: IPurchase, decodedUser: JwtPayload) => {

    const session = await Purchase.startSession();
    session.startTransaction();

    try {
        const isUserExist = await User.findById(decodedUser.userId);

        if (!isUserExist) {
            throw new AppError(404, "User doesn't exist!")
        };

        if (isUserExist.referredBy) {
            const referralStatus = await Referral.findOne({ referredUser: decodedUser?.userId });

            if (referralStatus?.status === ReferralStatus.PENDING) {
                const referrer = await User.findById({ _id: isUserExist?.referredBy })

                if (referrer) {
                    const payload = referrer?.credit + 2;
                    await User.findByIdAndUpdate(referrer?._id, {
                        credit: payload
                    }, {
                        new: true, runValidators: true, session
                    });
                };

                const payload = isUserExist?.credit + 2;
                await User.findByIdAndUpdate(isUserExist?._id, {
                    credit: payload
                }, {
                    new: true, runValidators: true, session
                })


                await Referral.findByIdAndUpdate(referralStatus?._id,
                    {
                        status: ReferralStatus.CONVERTED
                    }, {
                    new: true, runValidators: true, session
                });
            };

        };

        const purchasePayload = {
            ...payload,
            purchasedBy: decodedUser?.userId
        };

        const result = await Purchase.create([
            purchasePayload
        ], { session });


        await session.commitTransaction();
        session.endSession();

        return result;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


export const PurchaseService = {
    purchaseBook
};