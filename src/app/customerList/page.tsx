
import List from '@/component/List';
import Customer from '@/models/Customer';
import { headers } from 'next/headers';
import jwt from "jsonwebtoken";

export default async function Customers() {

    const token = headers().get("Cookie")?.split("=")[1];

    let verifyToken;
    let userId;
    let isAdmin;
    let customers;
    if (token) {
        verifyToken = jwt.verify(token, process.env.SECRET_KEY as string);
        userId = (jwt.verify(token ?? "", process.env.SECRET_KEY as string) as any).userId;
        isAdmin = (jwt.verify(token ?? "", process.env.SECRET_KEY as string) as any).isAdmin;
    }
    try {
        if (!isAdmin) {
            
             customers = await Customer.find({ userId });
        }else{
             customers = await Customer.find();

        }

    } catch (error) {
        
    }
  

    return (
        <div className="user-list p-4">
            <h1 className="text-2xl font-bold mb-4">Customer List</h1>
            <List items={customers ?? []} />
        </div >
    );
}