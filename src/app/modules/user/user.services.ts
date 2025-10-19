import { envVars } from "../../config/env";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcryptjs';

const generateReferralCode = (name: string = "R"): string => {
    const prefix = name.trim().substring(0, 2).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `${prefix}${randomPart}`;
    return code;
};

const createUser = async (payload: Partial<IUser>) => {
    const isUserExist = await User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new Error('User already exists');
    };

    const hashedPassword = await bcrypt.hash(payload?.password as string, envVars.BCRYPT_SALT_ROUNDS);

    const referralCode = generateReferralCode(payload.name);

    const userPayload = {
        password: hashedPassword,
        ...payload,
        referralCode,
        role: "USER"
    };

    const user = await User.create(userPayload);



    return user;
};

export const UserService = {
    createUser,
};