import { model, Schema } from "mongoose";
import { IPurchase } from "./purchase.interface";



const purchaseSchema = new Schema<IPurchase>({
    bookName: { type: String, required: true },
    price: { type: Number, required: true },
    purchasedBy: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    versionKey: false,
    timestamps: true
});


export const Purchase = model<IPurchase>("Purchase", purchaseSchema);