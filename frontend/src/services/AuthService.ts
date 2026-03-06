import { toast } from "sonner";
import { api } from "./api";

export const loginService = async (data: { email: string; password: string }) => {
    try {
        const res = await api.post("/auth/login", data);
        return res;
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Invalid credentials");
    }
};