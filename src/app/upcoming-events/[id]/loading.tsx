const Loading = () => {
    return (
        <main className="min-h-screen animate-pulse bg-[#FAFAF5] px-4 py-10 dark:bg-[#101812] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Back Button */}
                <div className="mb-6 h-5 w-32 rounded bg-gray-200 dark:bg-[#1C2920]" />

                <article className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#151D18]">

                    {/* Event Image */}
                    <div className="h-64 w-full bg-gray-200 dark:bg-[#1C2920] sm:h-96" />

                    <div className="p-6 sm:p-10">

                        {/* Event Type */}
                        <div className="h-7 w-28 rounded-full bg-gray-200 dark:bg-[#1C2920]" />

                        {/* Event Title */}
                        <div className="mt-5 h-10 w-3/4 rounded-lg bg-gray-200 dark:bg-[#1C2920]" />

                        {/* Location and Date */}
                        <div className="mt-6 flex flex-wrap gap-6">
                            <div className="h-5 w-40 rounded bg-gray-200 dark:bg-[#1C2920]" />
                            <div className="h-5 w-44 rounded bg-gray-200 dark:bg-[#1C2920]" />
                        </div>

                        {/* Description and Organizer */}
                        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-gray-100 pt-7 dark:border-green-900/50 lg:grid-cols-[minmax(0,1fr)_280px]">

                            {/* Description */}
                            <div>
                                <div className="h-7 w-48 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="mt-5 space-y-3">
                                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-[#1C2920]" />
                                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-[#1C2920]" />
                                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-[#1C2920]" />
                                    <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-[#1C2920]" />
                                </div>
                            </div>

                            {/* Organizer Card */}
                            <div className="h-fit rounded-2xl border border-green-100 bg-[#FAFAF5] p-5 dark:border-green-900/50 dark:bg-[#1C2920]">
                                <div className="h-4 w-36 rounded bg-gray-200 dark:bg-[#25352A]" />

                                <div className="mt-5 flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-[#25352A]" />

                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-[#25352A]" />
                                        <div className="h-3 w-40 rounded bg-gray-200 dark:bg-[#25352A]" />
                                    </div>
                                </div>

                                <div className="mt-5 h-3 w-full rounded bg-gray-200 dark:bg-[#25352A]" />
                                <div className="mt-2 h-3 w-4/5 rounded bg-gray-200 dark:bg-[#25352A]" />
                            </div>
                        </div>

                        {/* Event Participation */}
                        <div className="mt-8 space-y-4">
                            <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-[#1C2920]" />
                        </div>

                    </div>
                </article>
            </div>
        </main>
    );
};

export default Loading;