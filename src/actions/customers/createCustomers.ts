"use server";
import Customer from "@/models/Customer";
import { redirect } from "next/navigation";

export const createCustomer = async (formData: FormData) => {
    let email = formData.get("email");
    let name = formData.get("name");
    let userId = formData.get("userId");

    try {
        if (email && name) {
            const create = await Customer.create({ name, email, userId });
            const err = create.validateSync();
            if (err) {
                console.log("Validation error", err);
            }
            await create.save();
        }
    } catch (error) {
        console.log("Error creating Customer:", error);
    }
    redirect("/customerList");

};
