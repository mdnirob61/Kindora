
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

const galleryImages = [
    {
        title: "A Little Help, A Brighter Future",
        category: "Education for All",
        image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=85",
        size: "lg:col-span-2 lg:row-span-2",
    },
    {
        title: "Books That Open New Worlds",
        category: "Book Donation",
        image:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=85",
        size: "",
    },
    {
        title: "Care for Every Living Soul",
        category: "Animal Welfare",
        image:
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=85",
        size: "",
    },
    {
        title: "A Healthier Tomorrow Starts Today",
        category: "Health Awareness",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85",
        size: "",
    },
    {
        title: "Creativity Brings Us Together",
        category: "Youth Development",
        image:
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85",
        size: "",
    },
];

const Gallery = () => {
    return (
        <section className="bg-[#FAFAF5] px-4 py-20 transition-colors duration-300 dark:bg-[#101812] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div className="max-w-2xl">

                        <span className="inline-flex items-center gap-2 rounded-full bg-lime-100 px-4 py-2 text-sm font-semibold text-green-800 dark:bg-lime-900/40 dark:text-lime-300">
                            <Camera size={16} />
                            Moments That Matter
                        </span>

                        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
                            Kindness in{" "}
                            <span className="text-green-700 dark:text-lime-400">
                                Action.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-7 text-slate-500 dark:text-gray-400">
                            Every picture tells a story of people coming together,
                            supporting one another, and making their communities better.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-green-800/20 px-5 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-800 hover:text-white dark:border-lime-400/30 dark:text-lime-400 dark:hover:bg-lime-400 dark:hover:text-green-950"
                    >
                        Explore Events
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

                {/* Photo Grid */}
                <div className="grid auto-rows-55 grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-60 lg:grid-cols-4">
                    {galleryImages.map((item, index) => (
                        <article
                            key={item.title}
                            className={`group relative isolate overflow-hidden rounded-2xl bg-slate-200 dark:bg-[#1C2920] ${item.size} ${
                                index === 0
                                    ? "sm:col-span-2 sm:row-span-2"
                                    : ""
                            }`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes={
                                    index === 0
                                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                                        : "(max-width: 640px) 100vw, 50vw"
                                }
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 dark:from-black/90 dark:via-black/20" />

                            {/* Category Label */}
                            <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                {item.category}
                            </span>

                            {/* Image Caption */}
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-lime-300">
                                        Kindora Community
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl">
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-lime-300 text-green-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Message */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-green-900/10 bg-white p-6 transition-colors duration-300 dark:border-green-800/50 dark:bg-[#151D18] sm:flex-row sm:px-8">

                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100">
                            Every act of kindness leaves a mark.
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                            Be part of the next story worth sharing.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-900 dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                    >
                        Find Your Next Event
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default Gallery;
