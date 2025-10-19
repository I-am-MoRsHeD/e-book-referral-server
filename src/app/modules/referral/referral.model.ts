import { model, Schema } from "mongoose";
import { IReferral, ReferralStatus } from "./referral.interface";


const referralSchema = new Schema<IReferral>({
    referrerUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    referredUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: Object.values(ReferralStatus), default: ReferralStatus.PENDING },
}, {
    versionKey: false,
    timestamps: true,
})


export const Referral = model<IReferral>("Referral", referralSchema);