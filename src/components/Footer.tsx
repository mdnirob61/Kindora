import Link from "next/link";
import {
    Heart,
    ArrowUpRight,
    Camera,
    GitBranch,
    Mail,
    MapPin,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#10271D] text-white">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:px-10 lg:pt-20">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300 text-green-950">
                                <Heart size={23} strokeWidth={2.5} />
                            </div>

                            <span className="text-2xl font-extrabold tracking-tight">
                                Kindora<span className="text-lime-300">.</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
                            Small acts. Stronger communities. Discover meaningful
                            opportunities, connect with volunteers, and turn kindness into
                            lasting change with Kindora.
                        </p>

                        {/* Location */}
                        <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                            <MapPin size={17} className="shrink-0 text-lime-300" />
                            <span>Building stronger communities, together.</span>
                        </div>

                        {/* Email */}
                        <a
                            href="mailto:hello@kindora.com"
                            className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-lime-300"
                        >
                            <Mail size={17} className="text-lime-300" />
                            hello@kindora.com
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 lg:col-start-7">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Explore
                        </h3>

                        <ul className="mt-5 space-y-4 text-sm text-slate-300">
                            <li>
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-lime-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/upcoming-events"
                                    className="transition-colors hover:text-lime-300"
                                >
                                    Upcoming Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/create-event"
                                    className="transition-colors hover:text-lime-300"
                                >
                                    Create an Event
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/manage-events"
                                    className="transition-colors hover:text-lime-300"
                                >
                                    Manage Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Community
                        </h3>

                        <ul className="mt-5 space-y-4 text-sm text-slate-300">
                            <li>
                                <Link
                                    href="/joined-events"
                                    className="transition-colors hover:text-lime-300"
                                >
                                    My Joined Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="transition-colors hover:text-lime-300"
                                >
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/signup"
                                    className="transition-colors hover:text-lime-300"
                                >
                                    Join Kindora
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Stay Connected
                        </h3>

                        <p className="mt-5 text-sm leading-6 text-slate-300">
                            Follow our journey and help spread the spirit of kindness.
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all hover:border-lime-300 hover:bg-lime-300 hover:text-green-950"
                            >
                                <span className="text-lg font-bold leading-none">f</span>
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all hover:border-lime-300 hover:bg-lime-300 hover:text-green-950"
                            >
                                <Camera size={18} />
                            </a>

                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all hover:border-lime-300 hover:bg-lime-300 hover:text-green-950"
                            >
                                <GitBranch size={18} />
                            </a>
                        </div>

                        <Link
                            href="/upcoming-events"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lime-300 transition-colors hover:text-lime-200"
                        >
                            Make a difference
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8 lg:px-10">
                    <p className="text-xs text-slate-400 sm:text-sm">
                        © 2026 Kindora. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-xs text-slate-400 sm:text-sm">
                        Made with
                        <Heart size={14} className="fill-lime-300 text-lime-300" />
                        for a better community.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;