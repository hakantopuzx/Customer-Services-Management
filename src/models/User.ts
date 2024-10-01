import mongoose, { Model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    accessToken?: string;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserDocument>({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    accessToken: { type: String },
});

const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
