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
} from "./ui/dropdown-menu";
import {
    CalendarDays,
    LogOut,
    Plus,
    ClipboardList,
    Menu,
    Home,
} from "lucide-react";

const Navbar = () => {
    // Temporary user data. We will connect Better Auth later.
    const user = null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur-md">
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
                        className="flex items-center gap-2 font-semibold text-gray-600 transition-colors hover:text-green-700 text-[1rem]"
                    >
                        <Home size={17} />
                        Home
                    </Link>

                    <Link
                        href="/upcoming-events"
                        className="flex items-center gap-2 text-[1rem] font-semibold text-gray-600 transition-colors hover:text-green-700"
                    >
                        <CalendarDays size={17} />
                        Upcoming Events
                    </Link>
                </div>

                {/* Authentication */}
                <div className="flex items-center gap-3">

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none transition hover:bg-green-50 focus-visible:ring-2 focus-visible:ring-green-600">
                                <Avatar className="h-10 w-10 border-2 border-green-100">
                                    <AvatarImage src={user.image} alt={user.name} />
                                    <AvatarFallback className="bg-green-100 font-semibold text-green-800">
                                        {user.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <span className="hidden text-sm font-semibold text-gray-700 lg:block">
                                    {user.name}
                                </span>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                                <DropdownMenuLabel className="px-3 py-2">
                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs font-normal text-gray-500">
                                        Welcome to Kindora!
                                    </p>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="cursor-pointer rounded-lg">
                                    <Link href="/create-event" className="flex w-full items-center">
                                        <Plus className="mr-2 h-4 w-4 text-green-700" />
                                        Create Event
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer rounded-lg">
                                    <Link href="/manage-events" className="flex w-full items-center">
                                        <ClipboardList className="mr-2 h-4 w-4 text-green-700" />
                                        Manage Events
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer rounded-lg">
                                    <Link href="/joined-events" className="flex w-full items-center">
                                        <CalendarDays className="mr-2 h-4 w-4 text-green-700" />
                                        Joined Events
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="cursor-pointer rounded-lg text-red-600 focus:bg-red-50 focus:text-red-700">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-3">
                            <Link
                                href="/login"
                                className="rounded-xl py-2 px-6 font-semibold text-green-800 shadow-sm transition-all hover:bg-slate-200 hover:shadow-md border border-green-100"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-xl bg-green-700 py-2 px-6 font-semibold text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md"
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
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-green-200 text-green-800 hover:bg-green-50"
                            >
                                <Menu size={20} />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-52 rounded-xl p-2">
                                <DropdownMenuItem className="cursor-pointer rounded-lg">
                                    <Link href="/" className="flex w-full items-center">
                                        <Home className="mr-2 h-4 w-4" />
                                        Home
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="cursor-pointer rounded-lg">
                                    <Link href="/upcoming-events" className="flex w-full items-center">
                                        <CalendarDays className="mr-2 h-4 w-4" />
                                        Upcoming Events
                                    </Link>
                                </DropdownMenuItem>
                                {user && (
                                    <>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem className="cursor-pointer rounded-lg">
                                            <Link href="/create-event" className="flex w-full items-center">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Create Event
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer rounded-lg">
                                            <Link href="/manage-events" className="flex w-full items-center">
                                                <ClipboardList className="mr-2 h-4 w-4" />
                                                Manage Events
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer rounded-lg">
                                            <Link href="/joined-events" className="flex w-full items-center">
                                                <CalendarDays className="mr-2 h-4 w-4" />
                                                Joined Events
                                            </Link>
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