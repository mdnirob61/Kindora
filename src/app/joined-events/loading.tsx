const Loading = () => {
    return (
        <main className="min-h-screen animate-pulse bg-[#FAFAF5] px-5 py-12 dark:bg-[#101812]">
            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <div className="mb-10 space-y-3 text-center">
                    <div className="mx-auto h-9 w-64 rounded-lg bg-gray-200 dark:bg-[#1C2920]" />
                    <div className="mx-auto h-4 w-full max-w-md rounded bg-gray-200 dark:bg-[#1C2920]" />
                </div>

                {/* Joined Events Grid */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#151D18]"
                        >
                            {/* Event Image */}
                            <div className="h-52 bg-gray-200 dark:bg-[#1C2920]" />

                            {/* Event Information */}
                            <div className="space-y-4 p-6">

                                <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-3">
                                    <div className="h-11 flex-1 rounded-xl bg-gray-200 dark:bg-[#1C2920]" />
                                    <div className="h-11 flex-1 rounded-xl bg-gray-200 dark:bg-[#1C2920]" />
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </main>
    );
};

export default Loading;