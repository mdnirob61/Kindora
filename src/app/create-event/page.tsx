"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    ImagePlus,
    MapPin,
    Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

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

const CreateEventPage = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const router = useRouter();

    const [eventDate, setEventDate] = useState("");

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

        if (!user?.email) {
            toast.error("Please log in before creating an event.");
            return;
        }

        // Calculate today's date when the form is submitted.
        const today = new Date();

        const minDate = `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        if (!eventData.eventDate || eventData.eventDate <= minDate) {
            toast.error("Please select a future date.");
            return;
        }

        const res = await fetch(`http://localhost:5000/create-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        });

        const data = await res.json();
        // console.log(data)

        if (res.ok) {
            toast.success("Event created successfully!");
            form.reset();
            setEventDate("");
            router.push("/upcoming-events");
        }
        else {
            toast.error(`Failed to create event: ${data.message}`);
        }
    };

    return (
        <main className="min-h-screen bg-[#FAFAF5] px-4 py-10 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-[#101812]">
            <div className="mx-auto max-w-5xl">
                {/* Back link */}
                <Link
                    href="/upcoming-events"
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-green-800 transition hover:text-green-950 dark:text-lime-400 dark:hover:text-lime-300"
                >
                    <ArrowLeft size={17} />
                    Back to Upcoming Events
                </Link>

                {/* Page heading */}
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 dark:bg-green-900/40 dark:text-lime-400">
                        <Sparkles size={16} />
                        Make a Difference
                    </span>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-green-950 sm:text-4xl lg:text-5xl dark:text-gray-100">
                        Create an Event
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
                        Bring people together for a good cause. Create a community
                        event and inspire others to make a positive change.
                    </p>
                </div>

                {/* Form card — UI only */}
                <div className="overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-sm dark:border-green-900/50 dark:bg-[#151D18]">
                    {/* Card header */}
                    <div className="bg-[#123524] px-6 py-6 sm:px-9 dark:bg-[#1C2920]">
                        <h2 className="text-xl font-bold text-white">
                            Event Information
                        </h2>

                        <p className="mt-2 text-sm text-green-100/75">
                            Fill in the details to prepare your community event.
                        </p>
                    </div>

                    <form
                        className="space-y-6 p-6 sm:p-9"
                        onSubmit={handleSubmit}
                    >
                        {/* Event title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                            >
                                Event Title <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g. Clean Up Our Local Park"
                                required
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                            >
                                Description <span className="text-red-500">*</span>
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                placeholder="Describe your event, its purpose, and how people can participate..."
                                rows={5}
                                required
                                className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                            />
                        </div>

                        {/* Event type and location */}
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="eventType"
                                    className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                                >
                                    Event Type <span className="text-red-500">*</span>
                                </label>

                                <select
                                    id="eventType"
                                    name="eventType"
                                    defaultValue=""
                                    required
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
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
                                    <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    required
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
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
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="thumbnail"
                                name="thumbnail"
                                type="url"
                                placeholder="https://example.com/event-image.jpg"
                                required
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                            />

                            <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-500">
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
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="eventDate"
                                name="eventDate"
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10 dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                            />

                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                                Choose a future date for your event.
                            </p>
                        </div>

                        {/* Creator email placeholder */}
                        <div className="rounded-xl border border-green-100 bg-green-50/70 p-4 dark:border-green-900/50 dark:bg-[#1C2920]">
                            <p className="text-xs font-semibold uppercase tracking-wider text-green-800 dark:text-lime-400">
                                Event Organizer
                            </p>

                            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {user?.email || "Loading user information..."}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end dark:border-green-900/50">
                            <Link
                                href="/upcoming-events"
                                className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-green-900/60 dark:text-gray-300 dark:hover:bg-[#1C2920]"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-green-800 px-7 text-sm font-bold text-white transition hover:bg-green-900 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                            >
                                Create Event
                                <Sparkles size={17} />
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Every small act of kindness makes our community stronger. 💚
                </p>
            </div>
        </main>
    );
};

export default CreateEventPage;