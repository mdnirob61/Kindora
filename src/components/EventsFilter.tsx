"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IEvent } from "@/lib/types/event";

const eventTypes = [
    "All",
    "Cleanup",
    "Plantation",
    "Donation",
    "Education",
    "Health Awareness",
    "Animal Welfare",
    "Community Support",
    "Other",
];

interface EventsFilterProps {
    events: IEvent[];
}

const EventsFilter = ({ events }: EventsFilterProps) => {
    const [selectedType, setSelectedType] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = events.filter((event) => {
        const title = (event.title || "").toLowerCase();
        const location = (event.location || "").toLowerCase();
        const eventType = (event.eventType || "").toLowerCase();

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            title.includes(search) ||
            location.includes(search);

        const matchesType =
            selectedType === "All" ||
            eventType === selectedType.toLowerCase();

        return matchesSearch && matchesType;
    });

    return (
        <section className="mx-auto max-w-7xl px-4 py-10 transition-colors duration-300 sm:px-6 lg:px-8">

            {/* Search bar */}
            <div className="mb-8">
                <label htmlFor="event-search" className="sr-only">
                    Search events or areas
                </label>

                <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="m16 16 4 4" />
                    </svg>

                    <input
                        id="event-search"
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search events or areas..."
                        className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 dark:border-green-900/60 dark:bg-[#151D18] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_minmax(0,1fr)]">

                {/* Category sidebar */}
                <aside>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Event Categories
                    </h2>

                    <div className="flex flex-wrap gap-2 md:flex-col">
                        {eventTypes.map((type) => {
                            const isActive = selectedType === type;

                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setSelectedType(type)}
                                    aria-pressed={isActive}
                                    className={`rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition ${isActive
                                        ? "border-green-800 bg-green-800 text-white shadow-sm dark:border-lime-400 dark:bg-lime-400 dark:text-green-950"
                                        : "border-gray-200 bg-white text-gray-600 hover:border-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-900/60 dark:bg-[#151D18] dark:text-gray-300 dark:hover:border-lime-400/50 dark:hover:bg-[#1C2920] dark:hover:text-lime-400"
                                        }`}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Events section */}
                <div>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {selectedType === "All"
                                    ? "All Upcoming Events"
                                    : selectedType}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {filteredEvents.length}{" "}
                                {filteredEvents.length === 1 ? "event" : "events"} found
                            </p>
                        </div>

                        {(searchTerm || selectedType !== "All") && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedType("All");
                                }}
                                className="text-sm font-semibold text-green-800 underline underline-offset-4 transition hover:text-green-600 dark:text-lime-400 dark:hover:text-lime-300"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredEvents.map((event) => (
                                <article
                                    key={event._id}
                                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-green-900/50 dark:bg-[#151D18] dark:hover:border-green-700 dark:hover:shadow-black/20"
                                >
                                    <Link
                                        href={`/upcoming-events/${event._id}`}
                                        className="block"
                                    >
                                        <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-[#1C2920]">
                                            {event.thumbnail ? (
                                                <Image
                                                    src={event.thumbnail}
                                                    alt={event.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    className="object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                                                    No image available
                                                </div>
                                            )}

                                            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-800 shadow-sm dark:bg-[#1C2920] dark:text-lime-400">
                                                {event.eventType}
                                            </span>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-green-800 dark:text-gray-100 dark:group-hover:text-lime-400">
                                                {event.title}
                                            </h3>

                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                                {event.description}
                                            </p>

                                            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                                <p className="flex items-center gap-2">
                                                    <span aria-hidden="true">📍</span>
                                                    <span className="line-clamp-1">
                                                        {event.location}
                                                    </span>
                                                </p>

                                                <p className="flex items-center gap-2">
                                                    <span aria-hidden="true">📅</span>
                                                    {new Date(
                                                        `${event.eventDate.slice(0, 10)}T12:00:00`,
                                                    ).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </div>

                                            <div className="mt-5 border-t border-gray-100 pt-4 dark:border-green-900/50">
                                                <span className="text-sm font-bold text-green-800 dark:text-lime-400">
                                                    View Event →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center transition-colors duration-300 dark:border-green-800/60 dark:bg-[#151D18]">
                            <div className="mb-3 text-4xl" aria-hidden="true">
                                🔎
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                No matching events found
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Try another search term or choose a different event category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedType("All");
                                }}
                                className="mt-5 rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                            >
                                Show All Events
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventsFilter;