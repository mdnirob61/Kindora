'use client'
import { IEvent } from '@/lib/types/event';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const JoinedEventCard = ({ event }: { event: IEvent }) => {
    const router = useRouter();

    const handleRemoveEvent = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/joined-events/${event._id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                toast.success("Event removed successfully!");
                router.refresh();
            } else {
                toast.error("Failed to remove event.");
            }
        } catch (error) {
            console.error("Error removing event:", error);
            toast.error("An error occurred while removing the event.");
        }
    };

    return (
        <div>
            <article
                key={event._id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-green-900/50 dark:bg-[#151D18]"
            >

                <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-[#1C2920]">
                    {event.thumbnail ? (
                        <Image
                            src={event.thumbnail}
                            alt={event.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                            No image available
                        </div>
                    )}

                    {/* Dark transparent overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-10">
                        <p className="flex items-center gap-2 text-sm font-medium text-white">
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

                    {/* Event Type */}
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-800 shadow-sm dark:bg-[#1C2920]/95 dark:text-lime-400">
                        {event.eventType}
                    </span>
                </div>


                <div className="flex flex-1 flex-col p-5">
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
                            <span className="font-bold">Joined on:</span>
                            {event.joiningDate
                                ? new Date(event.joiningDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : "Date not available"}

                        </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="mt-5 border-t border-gray-100 pt-4 dark:border-green-900/50">
                            <Link
                                href={`/upcoming-events/${event.eventId}`}
                                className="block"
                            >
                                <span className="text-sm font-bold text-green-800 dark:text-lime-400">
                                    View Event →
                                </span>
                            </Link>
                        </div>
                        <div className="mt-5 border-t border-gray-100 pt-4 dark:border-green-900/50">
                            <Button variant='destructive' className="mt-0 shrink-0" onClick={handleRemoveEvent}>
                                <Trash2></Trash2> Remove Event
                            </Button>
                        </div>

                    </div>
                </div>
            </article>
        </div>
    );
};

export default JoinedEventCard;