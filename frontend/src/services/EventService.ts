import { toast } from "sonner";
import { api } from "./api";

export const CreateEvent = async (data: { name: string }) => {
    try {
        await api.post("/events", data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
    }
};