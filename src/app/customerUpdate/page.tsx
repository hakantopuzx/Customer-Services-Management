import CustomerUpdates from '@/component/CustomerUpdate';
import Customer from '@/models/Customer';
import { headers } from 'next/headers';
import jwt from "jsonwebtoken"
import { redirect } from 'next/navigation';

export default async function CustomerUpdate() {
    const token = headers().get("Cookie")?.split("=")[1];
    let isAdmin
    if (token) {
        isAdmin = (jwt.verify(token ?? "", process.env.SECRET_KEY as string) as any).isAdmin;
    }

    if (!isAdmin) {
        redirect("/")
    }

    const customers = await Customer.find()

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Update</h1>
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
                        {customers.map((customer: any) => (
                            <CustomerUpdates list={customer} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}