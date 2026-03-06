import { toast } from "sonner";
import { api } from "./api";

export const CreateEvent = async (data: { name: string }) => {
    try {
        await api.post("/events", data);
    } catch (error: any) {
         throw error.response?.data?.message || "Failed to fetch events";
    }
};

export const getEvents = async () => {
  try {
    const res = await api.get("/events");
    return res.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch events";
  }
};