import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import UpdateEventsPage from "@/components/UpdateEvent";
import DeleteEventPage from "@/components/DeleteEvent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { IEvent } from "@/lib/types/event";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const ManageEventsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    let managedEvents: IEvent[] = [];

    const token = await getTokenFromServer();

    if (user?.email) {
        try {
            const response = await fetch(
                `http://localhost:5000/manage-events/${user.email}`,
                {
                    cache: "no-store",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                managedEvents = data;

                managedEvents.sort(
                    (a, b) =>
                        new Date(a.eventDate).getTime() -
                        new Date(b.eventDate).getTime()
                );
            } else {
                console.error("API request failed:", data);
            }
        } catch (error) {
            console.error("Failed to fetch managed events:", error);
        }
    } else {
        console.log("No logged-in user found!");
    }

    return (
        <main className="min-h-screen bg-[#FAFAF5] transition-colors duration-300 dark:bg-[#101812]">
            {/* Header */}
            <section className="border-b border-green-100 bg-white dark:border-green-900/50 dark:bg-[#151D18]">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-800 dark:text-lime-400">
                        Your Contributions
                    </p>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
                                Manage Events
                            </h1>

                            <p className="mt-4 max-w-2xl leading-7 text-gray-500 dark:text-gray-400">
                                Keep your community initiatives organized and manage the
                                events you&apos;ve created.
                            </p>
                        </div>

                        <Link
                            href="/create-event"
                            className="w-fit rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Your Created Events
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            All the events you have organized.
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800 dark:bg-green-900/40 dark:text-lime-400">
                        {managedEvents.length} Events
                    </span>
                </div>

                {managedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {managedEvents.map((event) => (
                            <article
                                key={event._id}
                                className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-green-900/50 dark:bg-[#151D18]"
                            >
                                {/* Event Image */}
                                <div className="relative h-52 bg-gray-100 dark:bg-[#1C2920]">
                                    {event.thumbnail ? (
                                        <Image
                                            src={event.thumbnail}
                                            alt={event.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                                            No image available
                                        </div>
                                    )}
                                </div>

                                {/* Event Details */}
                                <div className="flex flex-1 flex-col p-5">
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/40 dark:text-lime-400">
                                        {event.eventType}
                                    </span>

                                    <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">
                                        {event.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        {event.description}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} />
                                            {event.location}
                                        </p>

                                        <p className="flex items-center gap-2 pb-2">
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
                                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-green-900/50">
                                        <Link
                                            href={`/upcoming-events/${event._id}`}
                                            className="flex items-center justify-center rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                                        >
                                            View Event
                                        </Link>

                                        <UpdateEventsPage event={event} />

                                        <DeleteEventPage id={event._id}></DeleteEventPage>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-green-900/60 dark:bg-[#151D18]">
                        <div className="mb-5 text-5xl">📅</div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            You haven&apos;t created any events yet
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                            Start something meaningful in your community. Create your
                            first event and invite others to participate.
                        </p>

                        <Link
                            href="/create-event"
                            className="mt-6 inline-flex rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
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