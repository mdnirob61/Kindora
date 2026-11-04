"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HeartHandshake, Users } from "lucide-react";
import { IEvent } from "@/lib/types/event";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const EventParticipation = ({ event }: { event: IEvent }) => {
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isJoined, setIsJoined] = useState(false);

    const handleJoinEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            toast.info("Please login to join this event.");
            router.push("/login");
            return;
        }

        if (isJoined) {
            toast.info("You have already joined this event!");
            return;
        }

        const data = {
            ...event,
            eventId: event._id,
            name: user.name,
            email: user.email,
            image: user.image,
            joiningDate: new Date(),
        };

        const token = await getTokenFromClient();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-event`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.status === 409) {
                setIsJoined(true);
                toast.info("You have already joined this event!");
                return;
            }

            if (!res.ok) {
                toast.error(result.message || "Failed to join event.");
                return;
            }

            setIsJoined(true);
            toast.success("Thank you for joining this event!");

        } catch (error) {
            console.error("Join event error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="mt-8 border-t border-gray-100 pt-6 sm:mt-10 sm:pt-8 dark:border-green-900/50">

            <div className="flex flex-col gap-5 rounded-2xl border border-[#E5E7DF] bg-[#FAFAF5] p-4 transition-colors duration-300 sm:p-5 md:p-6 dark:border-green-900/60 dark:bg-[#1C2920]">

                <form
                    onSubmit={handleJoinEvent}
                    className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                    {/* Volunteer Information */}
                    <div className="flex items-center gap-3 sm:gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E7F2E4] text-[#166534] sm:h-14 sm:w-14 sm:rounded-2xl dark:bg-green-900/50 dark:text-lime-400">
                            <Users size={24} className="sm:h-6.75 sm:w-6.75" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-base font-bold text-[#123524] sm:text-lg dark:text-gray-100">
                                Be Part of the Change
                            </h3>

                            <p className="mt-1 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                                {isJoined
                                    ? "Thank you for being part of this event!"
                                    : "Be part of something meaningful."}
                            </p>
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="w-full sm:w-auto">
                        <Button
                            type="submit"
                            disabled={isJoined}
                            className={`h-11 w-full rounded-xl px-5 text-sm font-semibold shadow-md transition-all sm:h-12 sm:w-auto sm:px-7 sm:text-base ${isJoined
                                ? "cursor-not-allowed bg-gray-400 text-white opacity-80 dark:bg-gray-600 dark:text-gray-200"
                                : "bg-[#166534] text-white shadow-[#166534]/15 hover:bg-[#123524] dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                                }`}
                        >
                            <HeartHandshake className="mr-2 h-5 w-5" />
                            {isJoined ? "Joined" : "Join This Event"}
                        </Button>
                    </div>
                </form>
            </div>

            <p className="mt-3 text-center text-[11px] text-gray-400 sm:mt-4 sm:text-xs dark:text-gray-500">
                Together, small actions create meaningful change.
            </p>

        </div>
    );
};

export default EventParticipation;
