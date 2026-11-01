import Link from "next/link";
import {
    ArrowUpRight,
    CalendarDays,
    HeartHandshake,
    MapPin,
    Users,
} from "lucide-react";

const features = [
    {
        number: "01",
        icon: CalendarDays,
        title: "Discover Events",
        description:
            "Explore upcoming community cleanups, donation drives, tree plantations, and other meaningful activities.",
        link: "/upcoming-events",
        linkText: "Explore events",
        iconColor: "bg-emerald-100 text-emerald-700",
    },
    {
        number: "02",
        icon: HeartHandshake,
        title: "Create an Event",
        description:
            "Turn your ideas into action. Create an initiative and invite others to make a positive difference.",
        link: "/create-event",
        linkText: "Start an initiative",
        iconColor: "bg-lime-100 text-lime-800",
    },
    {
        number: "03",
        icon: Users,
        title: "Make Connections",
        description:
            "Meet like-minded people, work together, and build stronger communities through shared experiences.",
        link: "/upcoming-events",
        linkText: "Find your community",
        iconColor: "bg-sky-100 text-sky-700",
    },
    {
        number: "04",
        icon: MapPin,
        title: "Make Local Impact",
        description:
            "Find opportunities to help in your area and spend your time on causes that truly matter.",
        link: "/upcoming-events",
        linkText: "Find opportunities",
        iconColor: "bg-orange-100 text-orange-700",
    },
];

const Features = () => {
    return (
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full bg-lime-100 px-4 py-2 text-sm font-semibold text-green-800">
                        What Makes Kindora Special
                    </span>

                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Everything You Need to{" "}
                        <span className="text-green-700">Make a Difference</span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
                        From discovering local opportunities to organizing your own
                        initiatives, Kindora helps turn good intentions into real impact.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.number}
                                className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl hover:shadow-green-900/5 sm:p-7"
                            >
                                {/* Number */}
                                <span className="absolute right-6 top-6 text-sm font-bold tracking-widest text-slate-300 transition-colors group-hover:text-green-600">
                                    {feature.number}
                                </span>

                                {/* Icon */}
                                <div
                                    className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconColor}`}
                                >
                                    <Icon size={27} strokeWidth={1.8} />
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                                    {feature.description}
                                </p>

                                {/* Link */}
                                <Link
                                    href={feature.link}
                                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-green-800 transition-colors hover:text-green-600"
                                >
                                    {feature.linkText}
                                    <ArrowUpRight
                                        size={17}
                                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </Link>
                            </article>
                        );
                    })}
                </div>

                {/* Bottom Message */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-green-950 px-6 py-7 sm:flex-row sm:px-8">
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Small actions. Meaningful change.
                        </h3>
                        <p className="mt-2 text-sm text-green-100/70">
                            Your community becomes stronger when you get involved.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime-300 px-6 py-3 text-sm font-bold text-green-950 transition-colors hover:bg-lime-200"
                    >
                        Get Involved
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Features;