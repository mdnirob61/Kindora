import EventsFilter from "@/components/EventsFilter";
import { IEvent } from "@/lib/types/event";
import Link from "next/link";

const UpcomingEventsPage = async () => {
    let events: IEvent[] = [];

    try {
        const response = await fetch(`http://localhost:5000/upcoming-events`);

        if (response.ok) {
            events = await response.json();
            // console.log(events);
        }
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }

    return (
        <main className="min-h-screen bg-[#FAFAF5] transition-colors duration-300 dark:bg-[#101812]">
            {/* Page heading */}
            <section className="border-b border-green-100 bg-white transition-colors duration-300 dark:border-green-900/50 dark:bg-[#151D18]">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-green-800 dark:text-lime-400">
                        Future Community Events
                    </p>

                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                                Upcoming Events
                            </h1>

                            <p className="mt-4 max-w-2xl leading-7 text-gray-500 dark:text-gray-400">
                                Discover community initiatives, find a cause you care about,
                                and make a positive difference together.
                            </p>
                        </div>

                        <Link
                            href="/create-event"
                            className="inline-flex w-fit items-center justify-center rounded-xl bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-700 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                        >
                            + Create Event
                        </Link>
                    </div>
                </div>
            </section>

            {/* Search, category filters, and event cards */}
            <EventsFilter events={events} />
        </main>
    );
};

export default UpcomingEventsPage;