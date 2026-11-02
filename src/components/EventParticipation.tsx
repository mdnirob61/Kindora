"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HeartHandshake, Users } from "lucide-react";
import { IEvent } from "@/lib/types/event";

const EventParticipation = ({ event }: { event: IEvent }) => {
    // console.log(event)

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

        try {
            const res = await fetch("http://localhost:5000/joined-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
        <div className="mt-10 border-t border-gray-100 pt-8">

            <div className="flex flex-col gap-5 rounded-2xl border border-[#E5E7DF] bg-[#FAFAF5] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                {/* Volunteer Information */}
                <form onSubmit={handleJoinEvent} className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-100">
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E7F2E4] text-[#166534]">
                            <Users size={27} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-[#123524]">
                                Be Part of the Change
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {isJoined
                                    ? "Thank you for being part of this event!"
                                    : "Be part of something meaningful."}
                            </p>
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">

                        <Button
                            type="submit"
                            disabled={isJoined}
                            className={`h-12 rounded-xl px-6 font-semibold text-white shadow-md transition-all sm:px-7 ${isJoined
                                ? "cursor-not-allowed bg-gray-400 opacity-80"
                                : "bg-[#166534] shadow-[#166534]/15 hover:bg-[#123524]"
                                }`}
                        >
                            {isJoined ? (
                                <>
                                    <HeartHandshake className="mr-2 h-5 w-5" />
                                    Joined
                                </>
                            ) : (
                                <>
                                    <HeartHandshake className="mr-2 h-5 w-5" />
                                    Join This Event
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
                Together, small actions create meaningful change.
            </p>

        </div>
    );
};

export default EventParticipation;