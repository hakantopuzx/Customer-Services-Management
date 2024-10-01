
import User from '@/models/User';
import List from '@/component/List';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from "jsonwebtoken"
export default async function Users() {

    const token = headers().get("Cookie")?.split("=")[1];
    let isAdmin
    if (token) {
        isAdmin = (jwt.verify(token ?? "", process.env.SECRET_KEY as string) as any).isAdmin;
    }
  
    if (!isAdmin) {
        redirect("/")
    }

    const users = await User.find();

    return (
        <div className="user-list p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <List items={users} />
        </div >
    );
}