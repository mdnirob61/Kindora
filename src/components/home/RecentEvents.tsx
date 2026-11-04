import { IEvent } from "@/lib/types/event";
import Image from "next/image";
import Link from "next/link";

const RecentEvents = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-upcoming-events`,
        {
            cache: 'no-store'
        });

    const events: IEvent[] = response.ok
        ? await response.json()
        : [];

    return (
        <section className="bg-[#FAFAF5] dark:bg-[#101812] py-20">
            <div className="max-w-7xl mx-auto px-5">

                {/* Section Heading */}
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-green-700 dark:text-lime-400 mb-3">
                        Make a Difference
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                        Recent Upcoming Events
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                        Discover meaningful opportunities to connect,
                        contribute, and make your community stronger.
                    </p>
                </div>

                {/* Events Grid */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="bg-white dark:bg-[#151D18] rounded-2xl overflow-hidden border border-gray-200 dark:border-green-900/50 shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Event Image */}
                                <div className="h-52 overflow-hidden">
                                    <Image
                                        src={event.thumbnail}
                                        alt={event.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        width={200}
                                        height={200}
                                    />
                                </div>

                                {/* Event Information */}
                                <div className="p-6">

                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-lime-400 px-3 py-1.5 rounded-full">
                                            {event.eventType}
                                        </span>

                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(
                                                `${event.eventDate}T00:00:00`
                                            ).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-1">
                                        {event.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                        📍 {event.location}
                                    </p>

                                    <Link
                                        href={`/upcoming-events/${event._id}`}
                                        className="block text-center bg-green-800 hover:bg-green-900 dark:bg-lime-400 dark:hover:bg-lime-300 text-white dark:text-gray-900 font-semibold py-3 rounded-xl transition-colors"
                                    >
                                        View Details
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                        No upcoming events available right now.
                    </p>
                )}

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/upcoming-events"
                        className="inline-block border-2 border-green-800 dark:border-lime-400 text-green-800 dark:text-lime-400 hover:bg-green-800 hover:text-white dark:hover:bg-lime-400 dark:hover:text-gray-900 font-semibold px-8 py-3 rounded-xl transition-colors"
                    >
                        Explore All Events →
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default RecentEvents;