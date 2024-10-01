import User from '@/models/User';
import UserUpdates from '@/component/UserUpdate';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from "jsonwebtoken"

export default async function UserUpdate() {

    const token = headers().get("Cookie")?.split("=")[1];
    let isAdmin
    if (token) {
        isAdmin = (jwt.verify(token ?? "", process.env.SECRET_KEY as string) as any).isAdmin;
    }

    if (!isAdmin) {
        redirect("/")
    }

    const users = await User.find()

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4">User Update</h1>
            <div className="table-content" style={{ overflowX: "auto" }}>
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID</th>
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Email</th>
                            <th className="py-2 px-4 border-b text-left">Update</th>
                            <th className="py-2 px-4 border-b text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <UserUpdates list={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}