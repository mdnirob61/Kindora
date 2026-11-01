import Link from "next/link";
import { ArrowRight, Heart, Plus } from "lucide-react";

const Banner = () => {
    return (
        <section className="px-4 pt-5 sm:px-6 lg:px-8">
            <div
                className="relative mx-auto flex min-h-[480px] max-w-7xl items-center overflow-hidden rounded-3xl bg-cover bg-center sm:min-h-[520px] lg:min-h-[580px]"
                style={{
                    backgroundImage: "url('/images/Banner.png')",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10" />

                {/* Content */}
                <div className="relative z-10 max-w-2xl px-6 py-16 sm:px-10 lg:px-16">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-lime-200 backdrop-blur-sm">
                        <Heart size={16} />
                        Community. Compassion. Change.
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Small Acts.
                        <span className="mt-2 block text-lime-300">
                            Stronger Communities.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                        Discover local opportunities, connect with passionate volunteers,
                        and make a lasting difference in the world around you.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/events"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-lime-300 px-7 font-semibold text-green-950 hover:bg-lime-200"
                        >
                            Explore Events
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>

                        <Link
                            href="/create-event"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/70 bg-white/10 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-green-900"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Create an Event
                        </Link>
                    </div>

                    {/* Kindora Impact Highlights */}
                    <div className="mt-10 grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-0">
                        <div className="border-white/20 px-3 sm:border-r sm:px-4">
                            <h3 className="text-2xl font-extrabold tracking-tight text-lime-300 sm:text-3xl">
                                1,200+
                            </h3>
                            <p className="mt-1 text-xs font-medium text-white/75 sm:text-sm">
                                People Volunteering
                            </p>
                        </div>

                        <div className="border-white/20 px-3 sm:border-r sm:px-4">
                            <h3 className="text-2xl font-extrabold tracking-tight text-emerald-300 sm:text-3xl">
                                85+
                            </h3>
                            <p className="mt-1 text-xs font-medium text-white/75 sm:text-sm">
                                Events Organized
                            </p>
                        </div>

                        <div className="border-white/20 px-3 sm:border-r sm:px-4 sm:pl-6">
                            <h3 className="text-2xl font-extrabold tracking-tight text-sky-300 sm:text-3xl">
                                12K+
                            </h3>
                            <p className="mt-1 text-xs font-medium text-white/75 sm:text-sm">
                                Lives Touched
                            </p>
                        </div>

                        <div className="px-3 sm:pl-6">
                            <h3 className="text-2xl font-extrabold tracking-tight text-orange-300 sm:text-3xl">
                                One Goal
                            </h3>
                            <p className="mt-1 text-xs font-medium text-white/75 sm:text-sm">
                                A Better Community
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;