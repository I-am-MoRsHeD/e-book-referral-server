import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { Referral } from "../referral/referral.model";


const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credit: { type: Number, default: 0 },
    referralCode: { type: String, required: true, unique: true },
    referredBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    role: { type: String, enum: ["USER"], default: "USER" },
}, {
    timestamps: true,
    versionKey: false,
});


userSchema.post('save', async function (doc) {
    if (doc.referredBy) {
        const referalPayload = {
            referrerUser: doc.referredBy,
            referredUser: doc._id
        };

        await Referral.create(referalPayload);

    };
});


export const User = model<IUser>("User", userSchema);