
import User from '@/models/User';
import { createCustomer } from '@/actions/customers/createCustomers';
import { headers } from 'next/headers';
import jwt from "jsonwebtoken"
import { redirect } from 'next/navigation';

export default async function UserCreate() {

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
            <h1 className="text-2xl font-bold mb-4">Customer Create</h1>
            <form action={createCustomer} className="w-full  mt-3 p-6 bg-white shadow-md rounded-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        user
                    </label>
                    <select name="userId" id="">
                        {users.map((user) => (
                            <option  value={user._id.toString() ?? ""}>{user.email}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ekle
                    </button>
                </div>
            </form>
        </div >
    );
}