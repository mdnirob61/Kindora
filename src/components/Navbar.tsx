"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup
} from "./ui/dropdown-menu";
import {
    CalendarDays,
    LogOut,
    Plus,
    ClipboardList,
    Menu,
    Home,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const router = useRouter();

    const { data: session } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
        router.refresh();
        toast.success("Logged Out Successfully!");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-green-900/50 dark:bg-[#151D18]/95">

            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center">
                    <Image
                        src="/images/NavLogo.png"
                        alt="Kindora"
                        width={150}
                        height={60}
                        priority
                        className="h-auto w-28 sm:w-36"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[1rem] font-semibold text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-lime-400"
                    >
                        <Home size={17} />
                        Home
                    </Link>

                    <Link
                        href="/upcoming-events"
                        className="flex items-center gap-2 text-[1rem] font-semibold text-gray-600 transition-colors hover:text-green-700 dark:text-gray-300 dark:hover:text-lime-400"
                    >
                        <CalendarDays size={17} />
                        Upcoming Events
                    </Link>

                </div>

                {/* Authentication */}
                <div className="flex items-center gap-3">

                    <ThemeToggle />

                    {user ? (
                        <DropdownMenu>

                            <DropdownMenuTrigger className="group relative flex items-center gap-2 rounded-full outline-none transition hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-600 dark:hover:bg-green-900/30">

                                <Avatar className="h-10 w-10 border-2 border-green-100 dark:border-green-800">
                                    <AvatarImage
                                        src={user.image ?? undefined}
                                        alt={user.name}
                                    />
                                    <AvatarFallback className="bg-green-100 font-semibold text-green-800 dark:bg-green-900 dark:text-lime-300">
                                        {user.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Display Name Tooltip */}
                                <span className="pointer-events-none absolute -bottom-9 left-1/2 z-50 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-[#123524] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                                    {user.name}
                                </span>

                                <span className="hidden text-sm font-semibold text-gray-700 lg:block dark:text-gray-200">
                                    {user.name}
                                </span>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-xl border-gray-200 bg-white p-2 dark:border-green-900 dark:bg-[#1C2920] dark:text-gray-100"
                            >

                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                                            {user.name}
                                        </p>

                                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                            Welcome to Kindora!
                                        </p>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator className="dark:bg-green-900" />

                                <DropdownMenuItem className="cursor-pointer dark:focus:bg-green-900/40">
                                    <Link href="/create-event" className="flex w-full items-center">
                                        <Plus className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                        Create Event
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer dark:focus:bg-green-900/40">
                                    <Link href="/manage-events" className="flex w-full items-center">
                                        <ClipboardList className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                        Manage Events
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer dark:focus:bg-green-900/40">
                                    <Link href="/joined-events" className="flex w-full items-center">
                                        <CalendarDays className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                        Joined Events
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="dark:bg-green-900" />

                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-700"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <Button variant={'destructive'} onClick={handleSignOut}>Logout</Button>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-3">

                            <Link
                                href="/login"
                                className="rounded-xl border border-green-100 px-6 py-2 font-semibold text-green-800 shadow-sm transition-all hover:bg-slate-200 hover:shadow-md dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/40"
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="rounded-xl bg-green-700 px-6 py-2 font-semibold text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md dark:bg-lime-500 dark:text-green-950 dark:hover:bg-lime-400"
                            >
                                Sign Up
                            </Link>

                        </div>
                    )}

                    {/* Mobile Navigation */}
                    <div className="md:hidden">

                        <DropdownMenu>

                            <DropdownMenuTrigger
                                aria-label="Open navigation menu"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-green-200 text-green-800 transition-colors hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/40"
                            >
                                <Menu size={20} />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-52 rounded-xl border-gray-200 bg-white p-2 dark:border-green-900 dark:bg-[#1C2920] dark:text-gray-100"
                            >

                                <DropdownMenuItem className="cursor-pointer rounded-lg dark:focus:bg-green-900/40">
                                    <Link href="/" className="flex w-full items-center">
                                        <Home className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                        Home
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer rounded-lg dark:focus:bg-green-900/40">
                                    <Link href="/upcoming-events" className="flex w-full items-center">
                                        <CalendarDays className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                        Upcoming Events
                                    </Link>
                                </DropdownMenuItem>

                                {user && (
                                    <>
                                        <DropdownMenuSeparator className="dark:bg-green-900" />

                                        <DropdownMenuItem className="cursor-pointer rounded-lg dark:focus:bg-green-900/40">
                                            <Link href="/create-event" className="flex w-full items-center">
                                                <Plus className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Create Event
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer rounded-lg dark:focus:bg-green-900/40">
                                            <Link href="/manage-events" className="flex w-full items-center">
                                                <ClipboardList className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Manage Events
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer rounded-lg dark:focus:bg-green-900/40">
                                            <Link href="/joined-events" className="flex w-full items-center">
                                                <CalendarDays className="mr-2 h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Joined Events
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator className="dark:bg-green-900" />

                                        <DropdownMenuItem
                                            className="cursor-pointer text-red-600 focus:text-red-700"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <Button variant={'destructive'} onClick={handleSignOut}>Logout</Button>
                                        </DropdownMenuItem>
                                    </>
                                )}

                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                </div>

            </nav>
        </header>
    );
};

export default Navbar;