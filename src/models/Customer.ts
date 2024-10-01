import mongoose, { Model } from 'mongoose';

export interface ICustomer {
    name: string;
    email: string;
    userId: mongoose.Schema.Types.ObjectId;

}

export interface ICustomerDocument extends ICustomer, Document {
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema = new mongoose.Schema<ICustomerDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Customer: Model<ICustomerDocument> = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export default Customer;
