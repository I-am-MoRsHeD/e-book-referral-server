import { JwtPayload } from "jsonwebtoken";
import { Referral } from "../referral/referral.model";
import { ReferralStatus } from "../referral/referral.interface";



const getReferralOverview = async (decodedUser: JwtPayload) => {
    const userId = decodedUser.userId;

    if (!decodedUser) {
        throw new Error('Invalid token');
    };

    const totalReferredUsers = await Referral.countDocuments({
        referrerUser: userId
    });

    const totalPurchasedUsers = await Referral.countDocuments({
        referrerUser: userId,
        status: ReferralStatus.CONVERTED
    });

    const totalCreditEarned = totalPurchasedUsers * 2;

    return {
        totalReferredUsers,
        totalPurchasedUsers,
        totalCreditEarned
    }
};


export const StatsService = {
    getReferralOverview
}