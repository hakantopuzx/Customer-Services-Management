import User from '../../../models/User';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const body = await request.json()

    if (body.id) {
        const deleteUser = await User.findByIdAndDelete(body.id)

        return NextResponse.json({ message: "User deleted" });
    }

    return NextResponse.json({ message: "User not found" })

}


export async function PUT(request: Request) {
    const body = await request.json()

    if (body.id) {
        const updateUser = await User.findByIdAndUpdate(body.id, { name: body.name, email: body.email })

        return NextResponse.json({ message: "User updated" });
    }

    return NextResponse.json({ message: "User not found" })
}