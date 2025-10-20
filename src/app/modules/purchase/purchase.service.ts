import { JwtPayload } from "jsonwebtoken";
import { IPurchase } from "./purchase.interface";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import { Purchase } from "./purchase.model";
import { Referral } from "../referral/referral.model";
import { ReferralStatus } from "../referral/referral.interface";


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
                const referredUser = await User.findById({ _id: isUserExist?.referredBy })

                if (referredUser) {
                    referredUser.credit = Number(referredUser?.credit) + 2
                    await referredUser.save();
                };

                isUserExist.credit = isUserExist.credit + 2;
                await isUserExist.save();


                await Referral.updateOne({ _id: referralStatus?._id }, {
                    status: ReferralStatus.CONVERTED
                }, {
                    runValidators: true, session
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