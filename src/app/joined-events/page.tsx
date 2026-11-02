import { IEvent } from "@/lib/types/event";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";


const JoinedEventsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    let joinedEvents: IEvent[] = [];

    try {
        const response = await fetch(
            `http://localhost:5000/joined-events/${user?.email}`,
            {
                cache: "no-store",
            }
        );

        if (response.ok) {
            joinedEvents = await response.json();

            // Sort by event date (soonest first)
            joinedEvents.sort(
                (a, b) =>
                    new Date(a.eventDate).getTime() -
                    new Date(b.eventDate).getTime()
            );
        }
    } catch (error) {
        console.error("Failed to fetch joined events:", error);
    }

    return (
        <main className="min-h-screen bg-[#FAFAF5]">
            {/* Header */}
            <section className="border-b border-green-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-800">
                        Your Community Journey
                    </p>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                                Joined Events
                            </h1>

                            <p className="mt-4 max-w-2xl leading-7 text-gray-500">
                                Keep track of the community events you&apos;ve joined and get
                                ready to make a difference together.
                            </p>
                        </div>

                        <Link
                            href="/upcoming-events"
                            className="inline-flex w-fit items-center justify-center rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            Explore Events →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Events */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Your Events
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Events are arranged by date, starting with the soonest.
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">
                        {joinedEvents.length} {joinedEvents.length === 1 ? "Event" : "Events"}
                    </span>
                </div>

                {joinedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {joinedEvents.map((event) => (
                            <article
                                key={event._id}
                                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >

                                <div className="relative h-52 overflow-hidden bg-gray-100">
                                    {event.thumbnail ? (
                                        <Image
                                            src={event.thumbnail}
                                            alt={event.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                            No image available
                                        </div>
                                    )}

                                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-800 shadow-sm">
                                        {event.eventType}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-green-800">
                                        {event.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                        {event.description}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <span aria-hidden="true">📍</span>
                                            <span className="line-clamp-1">
                                                {event.location}
                                            </span>
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <span aria-hidden="true">📅</span>
                                            {event.eventDate
                                                ? new Date(event.eventDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                                : "Date not available"}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="mt-5 border-t border-gray-100 pt-4">
                                            <Link
                                                href={`/upcoming-events/${event._id}`}
                                                className="block"
                                            ><span className="text-sm font-bold text-green-800">
                                                    View Event →
                                                </span></Link>
                                        </div>
                                        <Button variant='destructive' className="mt-8 border-t border-gray-100">
                                           <Trash2></Trash2> Remove Event
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                        <div className="mb-5 text-5xl" aria-hidden="true">
                            🌱
                        </div>

                        <h3 className="text-xl font-bold text-gray-900">
                            No joined events yet
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
                            Your community journey starts here. Explore upcoming events
                            and join an initiative that matters to you.
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            Explore Upcoming Events
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
};

export default JoinedEventsPage;