"use client";

import { useState } from "react";
import { ArrowRight, Heart, Mail, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        setIsSubscribed(true);

        toast.success("Subscription Done!");

        setEmail("");
    };

    return (
        <section className="bg-[#FAFAF5] px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#123524] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-lime-300/10" />
                <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-lime-300/10" />
                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-lime-300/5 blur-3xl" />

                <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Left content */}
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-sm font-medium text-lime-300">
                            <Sparkles size={16} />
                            Stay Inspired
                        </span>

                        <h2 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            A Little Kindness in Your{" "}
                            <span className="text-lime-300">Inbox.</span>
                        </h2>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-green-100/75 sm:text-base sm:leading-8">
                            Get updates about upcoming community events, inspiring stories,
                            and new ways to make a difference in the lives around you.
                        </p>

                        <div className="mt-7 flex items-center gap-3 text-sm text-green-100/80">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-300/10 text-lime-300">
                                <Heart size={19} />
                            </div>

                            <p>
                                <span className="font-semibold text-white">
                                    Good news. Good people.
                                </span>
                                <br />
                                A community worth being part of.
                            </p>
                        </div>
                    </div>

                    {/* Right newsletter form */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-8">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-300 text-green-950">
                            <Mail size={23} />
                        </div>

                        {isSubscribed ? (
                            <div className="py-4">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-lime-300/15 text-lime-300">
                                    <Heart size={28} />
                                </div>

                                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                                    Thank you for your subscription!
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-green-100/75">
                                    You&apos;re now part of the Kindora community. Thank you for
                                    staying inspired and spreading kindness!
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setIsSubscribed(false)}
                                    className="mt-6 text-sm font-semibold text-lime-300 transition hover:text-lime-200"
                                >
                                    Subscribe another email →
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-white sm:text-2xl">
                                    Join the Kindora Newsletter
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-green-100/65">
                                    A little inspiration, delivered straight to you.
                                </p>

                                <form
                                    className="mt-7 flex flex-col gap-3 sm:flex-row"
                                    onSubmit={handleSubscribe}
                                >
                                    <label htmlFor="newsletter-email" className="sr-only">
                                        Email address
                                    </label>

                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        className="h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-green-100/45 transition focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20"
                                    />

                                    <button
                                        type="submit"
                                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-lime-300 px-5 text-sm font-bold text-green-950 transition hover:bg-lime-200"
                                    >
                                        Subscribe
                                        <ArrowRight size={17} />
                                    </button>
                                </form>

                                <p className="mt-4 text-xs leading-5 text-green-100/50">
                                    Stay connected with Kindora and discover more ways to make a
                                    positive difference.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;