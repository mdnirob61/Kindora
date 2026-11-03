'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { CalendarDays, ImagePlus, MapPin, Pencil, Sparkles } from "lucide-react"
import Link from "next/link"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IEvent } from "@/lib/types/event"
import { useSession } from "@/lib/auth-client"
import { getTokenFromClient } from "@/lib/getTokenFromClient"

const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Education",
    "Health Awareness",
    "Animal Welfare",
    "Community Support",
    "Other",
];

export default function UpdateEventsPage({ event }: { event: IEvent }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = useSession();
    const user = session?.user;

    const [eventDate, setEventDate] = useState(event.eventDate);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const eventData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            eventType: formData.get("eventType") as string,
            location: formData.get("location") as string,
            thumbnail: formData.get("thumbnail") as string,
            eventDate: formData.get("eventDate") as string,
            email: user?.email,
        };

        // Calculate today's date when the form is submitted.
        const today = new Date();

        const minDate = `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        if (!eventData.eventDate || eventData.eventDate <= minDate) {
            alert("Please select a future date.");
            return;
        }

        const token = await getTokenFromClient();

        const res = await fetch(`http://localhost:5000/manage-events/${event._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(eventData),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Event updated successfully!");
            setIsOpen(false);
            form.reset();
            setEventDate("");
            router.refresh();
            router.push("/manage-events");
        }
        else {
            toast.error(`Failed to update event: ${data.message}`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button variant='outline' className="dark:border-green-800 dark:bg-[#151D18] dark:text-gray-200 dark:hover:bg-[#1C2920]">
                    <Pencil></Pencil>
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full min-w-xl max-h-[85vh] overflow-y-auto dark:border-green-900/50 dark:bg-[#151D18]">
                <DialogHeader>
                    <DialogTitle className={'text-center text-2xl font-bold text-green-800 dark:text-lime-400'}>
                        Edit Event
                    </DialogTitle>

                    <DialogDescription className="dark:text-gray-400">
                        <form
                            className="space-y-4 p-5 sm:p-6"
                            onSubmit={handleSubmit}
                        >
                            {/* Event title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                                >
                                    Event Title
                                </label>

                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    defaultValue={event.title}
                                    placeholder="e.g. Clean Up Our Local Park"
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    defaultValue={event.description}
                                    placeholder="Describe your event, its purpose, and how people can participate..."
                                    rows={3}
                                    className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                                />
                            </div>

                            {/* Event type and location */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="eventType"
                                        className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                                    >
                                        Event Type
                                    </label>

                                    <select
                                        id="eventType"
                                        name="eventType"
                                        defaultValue={event.eventType}
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                                    >
                                        <option value="" disabled>
                                            Select event type
                                        </option>

                                        {eventTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="location"
                                        className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                                    >
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin size={15} />
                                            Location
                                        </span>{" "}
                                    </label>

                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        defaultValue={event.location}
                                        placeholder="e.g. Dhaka, Bangladesh"
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                                    />
                                </div>
                            </div>

                            {/* Thumbnail URL */}
                            <div>
                                <label
                                    htmlFor="thumbnail"
                                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                                >
                                    <span className="inline-flex items-center gap-1">
                                        <ImagePlus size={16} />
                                        Thumbnail Image URL
                                    </span>{" "}
                                </label>

                                <input
                                    id="thumbnail"
                                    name="thumbnail"
                                    type="url"
                                    defaultValue={event.thumbnail}
                                    placeholder="https://example.com/event-image.jpg"
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                                />

                                <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                                    Enter the URL of your event thumbnail.
                                </p>
                            </div>

                            {/* Event date */}
                            <div>
                                <label
                                    htmlFor="eventDate"
                                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                                >
                                    <span className="inline-flex items-center gap-1">
                                        <CalendarDays size={16} />
                                        Event Date
                                    </span>{" "}
                                </label>

                                <input
                                    id="eventDate"
                                    name="eventDate"
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                                />

                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Choose a future date for your event.
                                </p>
                            </div>

                            {/* Creator email placeholder */}
                            <div className="rounded-xl border border-green-100 bg-green-50/70 p-4 dark:border-green-900/60 dark:bg-[#1C2920]">
                                <p className="text-xs font-semibold uppercase tracking-wider text-green-800 dark:text-lime-400">
                                    Event Organizer
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {event.email}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end dark:border-green-900/50">
                                <Link
                                    href="/manage-events"
                                    className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-green-900/60 dark:text-gray-300 dark:hover:bg-[#1C2920]"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-800 px-7 text-sm font-bold text-white transition hover:bg-green-900 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                                >
                                    Update Event
                                    <Sparkles size={17} />
                                </button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}