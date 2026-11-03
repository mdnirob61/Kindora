import { IEvent } from "@/lib/types/event";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import JoinedEventCard from "@/components/JoinedEventCard";

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
        <main className="min-h-screen bg-[#FAFAF5] transition-colors duration-300 dark:bg-[#101812]">
            {/* Header */}
            <section className="border-b border-green-100 bg-white dark:border-green-900/50 dark:bg-[#151D18]">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-800 dark:text-lime-400">
                        Your Community Journey
                    </p>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
                                Joined Events
                            </h1>

                            <p className="mt-4 max-w-2xl leading-7 text-gray-500 dark:text-gray-400">
                                Keep track of the community events you&apos;ve joined and get
                                ready to make a difference together.
                            </p>
                        </div>

                        <Link
                            href="/upcoming-events"
                            className="inline-flex w-fit items-center justify-center rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Your Events
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Events are arranged by date, starting with the soonest.
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800 dark:bg-green-900/40 dark:text-lime-400">
                        {joinedEvents.length} {joinedEvents.length === 1 ? "Event" : "Events"}
                    </span>
                </div>

                {joinedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {joinedEvents.map((event) => {
                            return <JoinedEventCard key={event._id} event={event} />;
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-green-900/60 dark:bg-[#151D18]">
                        <div className="mb-5 text-5xl" aria-hidden="true">
                            🌱
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            No joined events yet
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                            Your community journey starts here. Explore upcoming events
                            and join an initiative that matters to you.
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
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