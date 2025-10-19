import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcryptjs';

const generateReferralCode = (name: string = "R"): string => {
    const prefix = name.trim().substring(0, 2).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${prefix}${randomPart}`;
    return code;
};

const createUser = async (payload: Partial<IUser>, query?: Record<string, string>) => {

    const isUserExist = await User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new Error('User already exists');
    };

    const hashedPassword = await bcrypt.hash(payload?.password as string, envVars.BCRYPT_SALT_ROUNDS);

    let referredBy = null;

    if (query?.r) {
        const referredUser = await User.findOne({ referralCode: query?.r });
        if (!referredUser) {
            throw new AppError(404, 'Invalid referral code');
        };

        referredBy = referredUser;
    }

    const referralCode = generateReferralCode(payload.name);

    const userPayload = {
        password: hashedPassword,
        ...payload,
        referralCode,
        referredBy: referredBy?._id,
        role: "USER"
    };

    const user = await User.create(userPayload);

    return user;
};

export const UserService = {
    createUser,
};