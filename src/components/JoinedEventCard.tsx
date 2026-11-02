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
            const response = await fetch(`http://localhost:5000/joined-events/${event._id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            console.log(result)

            if (response.ok) {
                toast.success('Event removed successfully!');
                router.refresh();
            } else {
                toast.error('Failed to remove event.');
            }
        } catch (error) {
            console.error('Error removing event:', error);
            toast.error('An error occurred while removing the event.');
        }
    };

    return (
        <div>
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
                        <Button variant='destructive' className="mt-8 border-t border-gray-100" onClick={handleRemoveEvent}>
                            <Trash2></Trash2> Remove Event
                        </Button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default JoinedEventCard;