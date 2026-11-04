import React from 'react';

const HomePageLoading = () => {
    return (
        <main className="min-h-screen bg-[#FAFAF5] dark:bg-[#101812] animate-pulse">

            {/* Hero Skeleton */}
            <section className="mx-auto max-w-7xl px-5 py-16">
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">

                    <div className="space-y-5">
                        <div className="h-5 w-36 rounded-full bg-gray-200 dark:bg-[#1C2920]" />

                        <div className="h-10 w-full max-w-lg rounded-lg bg-gray-200 dark:bg-[#1C2920]" />

                        <div className="h-5 w-full max-w-md rounded bg-gray-200 dark:bg-[#1C2920]" />
                        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-[#1C2920]" />

                        <div className="h-12 w-40 rounded-xl bg-gray-200 dark:bg-[#1C2920]" />
                    </div>

                    <div className="h-64 rounded-2xl bg-gray-200 dark:bg-[#1C2920] md:h-80" />

                </div>
            </section>

            {/* Stats Skeleton */}
            <section className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-10 md:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#151D18]"
                    >
                        <div className="h-8 w-16 rounded bg-gray-200 dark:bg-[#1C2920]" />
                        <div className="mt-3 h-4 w-28 rounded bg-gray-200 dark:bg-[#1C2920]" />
                    </div>
                ))}
            </section>

            {/* Recent Events Skeleton */}
            <section className="mx-auto max-w-7xl px-5 py-16">

                <div className="mb-10 space-y-3 text-center">
                    <div className="mx-auto h-5 w-36 rounded bg-gray-200 dark:bg-[#1C2920]" />
                    <div className="mx-auto h-9 w-64 rounded bg-gray-200 dark:bg-[#1C2920]" />
                    <div className="mx-auto h-4 w-full max-w-md rounded bg-gray-200 dark:bg-[#1C2920]" />
                </div>

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#151D18]"
                        >
                            {/* Image */}
                            <div className="h-52 bg-gray-200 dark:bg-[#1C2920]" />

                            {/* Content */}
                            <div className="space-y-4 p-6">
                                <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="h-4 w-full rounded bg-gray-200 dark:bg-[#1C2920]" />
                                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-[#1C2920]" />
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
};

export default HomePageLoading;