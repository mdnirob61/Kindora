import EventParticipation from "@/components/EventParticipation";
import { IEvent } from "@/lib/types/event";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EventDetailsPageProps {
    params: Promise<{ id: string }>
}

const EventDetailsPage = async ({ params, }: EventDetailsPageProps) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/upcoming-event/${id}`);

    if (!res.ok) notFound();
    const event: IEvent = await res.json();
    // console.log(event)

    if (!event) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#FAFAF5] px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Event not found
                    </h1>

                    <p className="mt-3 text-gray-500">
                        We couldn&apos;t load this event. Please try again later.
                    </p>

                    <Link
                        href="/upcoming-events"
                        className="mt-6 inline-block rounded-lg bg-green-800 px-5 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        Back to Events
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAFAF5] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <Link
                    href="/upcoming-events"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-600"
                >
                    ← Back to Events
                </Link>

                <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    {event.thumbnail && (
                        <div className="relative h-64 w-full sm:h-96">
                            <Image
                                src={event.thumbnail}
                                alt={event.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 1024px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 sm:p-10">
                        <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-800">
                            {event.eventType}
                        </span>

                        <h1 className="mt-5 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            {event.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
                            <p>📍 {event.location}</p>

                            <p>
                                📅{" "}
                                {new Date(
                                    `${event.eventDate.slice(0, 10)}T12:00:00`,
                                ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-7">
                            <h2 className="text-xl font-bold text-gray-900">
                                About This Event
                            </h2>

                            <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
                                {event.description}
                            </p>
                        </div>

                        <EventParticipation event={event}></EventParticipation>
                    </div>
                </article>
            </div>
        </main>
    );
};

export default EventDetailsPage;