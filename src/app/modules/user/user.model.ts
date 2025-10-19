import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true },
    referredBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    role: { type: String, enum: ["USER"], default: "USER" },
}, {
    timestamps: true,
    versionKey: false,
});

export const User = model<IUser>("User", userSchema);