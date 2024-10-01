import mongoose, { Connection } from "mongoose";
let cachedConnection: Connection | null = null;
export const connectDb = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected");
        
        cachedConnection = connection.connection;
        return cachedConnection;
    } catch (error) {
        console.log(error);
    }
};