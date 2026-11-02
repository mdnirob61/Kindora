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

const DeleteEventPage = ({ id }: { id: string }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:5000/manage-events/${id}`, {
                method: 'DELETE',
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
                className="rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50">
                <Trash2></Trash2>
                Delete
            </Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteEventPage;