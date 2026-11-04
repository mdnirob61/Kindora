'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const DeleteEventPage = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        const token = await getTokenFromClient();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manage-events/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            await res.json();

            if (!res.ok) {
                toast.error("Failed to delete event.");
            }

            toast.success("Event deleted successfully!");
            router.push('/manage-events');

        } catch {
            toast.error("An error occurred while deleting the event.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button
                variant="outline"
                className="rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/60 dark:bg-[#151D18] dark:text-red-400 dark:hover:bg-red-950/40">
                <Trash2></Trash2>
                Delete
            </Button>} />

            <AlertDialogContent className="dark:border-green-900/50 dark:bg-[#151D18]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-gray-100">
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="dark:text-gray-400">
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-200 dark:hover:bg-[#26372B]">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteEventPage;