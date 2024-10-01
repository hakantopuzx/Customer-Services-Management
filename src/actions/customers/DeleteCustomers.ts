"use server";
import Customer from "@/models/Customer";
import { revalidatePath } from "next/cache";

export const deleteCustomer = async (id: string) => {
    try {
        if (id) {
            const deletedCustomer = await Customer.findByIdAndDelete(id);
            if (deletedCustomer) {
                console.log(`Deleted Customer: ${deletedCustomer.name}`);
                revalidatePath("/");
            } else {
                console.log(`Customer with ID ${id} not found`);
            }
        }
    } catch (error) {
        console.log("Error deleting Customer:", error);
    }
};
