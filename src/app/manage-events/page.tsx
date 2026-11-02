import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import UpdateEventsPage from "@/components/UpdateEvent";
import DeleteEventPage from "@/components/DeleteEvent";

interface IEvent {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    eventDate: string;
}

const ManageEventsPage = async () => {
    let events: IEvent[] = [];

    try {
        const res = await fetch("");

        if (res.ok) {
            events = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }

    return (
        <main className="min-h-screen bg-[#FAFAF5]">
            {/* Header */}
            <section className="border-b border-green-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-800">
                        Your Contributions
                    </p>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                                Manage Events
                            </h1>

                            <p className="mt-4 max-w-2xl leading-7 text-gray-500">
                                Keep your community initiatives organized and manage the
                                events you&apos;ve created.
                            </p>
                        </div>

                        <Link
                            href="/create-event"
                            className="w-fit rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            + Create New Event
                        </Link>
                    </div>
                </div>
            </section>

            {/* Events */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Your Created Events
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            All the events you have organized.
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">
                        {events.length} Events
                    </span>
                </div>

                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <article
                                key={event._id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Event Image */}
                                <div className="relative h-52 bg-gray-100">
                                    {event.thumbnail ? (
                                        <Image
                                            src={event.thumbnail}
                                            alt={event.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                            No image available
                                        </div>
                                    )}
                                </div>

                                {/* Event Details */}
                                <div className="p-5">
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                        {event.eventType}
                                    </span>

                                    <h3 className="mt-4 text-lg font-bold text-gray-900">
                                        {event.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                        {event.description}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            {event.location}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <CalendarDays size={16} />
                                            {new Date(event.eventDate).toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                }
                                            )}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                                        <Link
                                            href={`/upcoming-events/${event._id}`}
                                            className="flex items-center justify-center rounded-lg bg-green-800 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                        >
                                            View
                                        </Link>

                                        <UpdateEventsPage event={event} />

                                        <DeleteEventPage id={event._id}></DeleteEventPage>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                        <div className="mb-5 text-5xl">📅</div>

                        <h3 className="text-xl font-bold text-gray-900">
                            You haven&apos;t created any events yet
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
                            Start something meaningful in your community. Create your
                            first event and invite others to participate.
                        </p>

                        <Link
                            href="/create-event"
                            className="mt-6 inline-flex rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            Create Your First Event
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ManageEventsPage;