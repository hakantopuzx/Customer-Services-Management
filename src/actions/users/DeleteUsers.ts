"use server";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
    try {
        if (id) {
            const deletedUser = await User.findByIdAndDelete(id);
            if (deletedUser) {
                console.log(`Deleted user: ${deletedUser.name}`);
                revalidatePath("/");
            } else {
                console.log(`User with ID ${id} not found`);
            }
        }
    } catch (error) {
        console.log("Error deleting user:", error);
    }
};
