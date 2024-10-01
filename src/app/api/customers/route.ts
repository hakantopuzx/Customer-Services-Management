import Customer from '@/models/Customer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json()

    if (body.id) {
        const deleteCustomer = await Customer.findByIdAndDelete(body.id)

        return NextResponse.json({ message: "Customer deleted" });
    }

    return NextResponse.json({ message: "Customer not found" })

}

export async function PUT(request: Request) {
    const body = await request.json()

    if (body.id) {
        const updateCustomer = await Customer.findByIdAndUpdate(body.id, { name: body.name, email: body.email })

        return NextResponse.json({ message: "Customer updated" });
    }

    return NextResponse.json({ message: "Customer not found" })
}