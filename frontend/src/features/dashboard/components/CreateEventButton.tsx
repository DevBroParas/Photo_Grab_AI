import { useState } from "react";
import Modal from "./Model";
import { CreateEvent } from "../../../services/EventService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../../components/ui/Button";

export default function CreateEventButton() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
    })

    const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateEvent =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await CreateEvent(form);
            setLoading(true);
            setOpen(false);
            Navigate("/upload");
            toast.success('Event created successfully!')

             
           } catch (error: any) {
             toast.error(error.response?.data?.message || "Something went wrong")
           } finally {
             setLoading(false);
           }
       
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                loading={loading}
            >
                Create Event +
            </Button>

            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className="">
                    <form className="flex gap-2 flex-col" onSubmit={handleCreateEvent}>
                        <input className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#686df4]" type="text" placeholder="Event Name" name="name" onChange={handleEventChange}/>
                        
                        <button type="submit" className="w-full py-3 rounded-lg bg-[#686df4] text-white font-semibold hover:bg-[#5a5ff7] transition">Submit</button>
                    </form>
                </div>
            </Modal>
        </>
    );
}