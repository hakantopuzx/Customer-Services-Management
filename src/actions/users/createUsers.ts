"use server";
import User from "@/models/User";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {
    let email = formData.get("email");
    let name = formData.get("name");

    try {
        if (email && name) {
            const create = await User.create({ name, email });
            const err = create.validateSync();
            if (err) {
                console.log("Validation error", err);
            }
            await create.save();
        }
    } catch (error) {
        console.log("Error creating user:", error);
    }

    redirect("/userList");
};
