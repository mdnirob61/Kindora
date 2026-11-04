

const loading = () => {
    return (
        <main className="min-h-screen bg-[#FAFAF5] px-5 py-12 dark:bg-[#101812] animate-pulse">
            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <div className="mb-10 space-y-4 text-center">
                    <div className="mx-auto h-9 w-64 rounded-lg bg-gray-200 dark:bg-[#1C2920]" />
                    <div className="mx-auto h-4 w-full max-w-md rounded bg-gray-200 dark:bg-[#1C2920]" />
                </div>

                {/* Search Bar */}
                <div className="mb-10 flex justify-center">
                    <div className="h-12 w-full max-w-xl rounded-xl bg-gray-200 dark:bg-[#1C2920]" />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">

                    {/* Sidebar Filters */}
                    <aside className="hidden space-y-4 lg:block">
                        <div className="h-6 w-32 rounded bg-gray-200 dark:bg-[#1C2920]" />

                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div
                                key={item}
                                className="h-11 rounded-xl bg-gray-200 dark:bg-[#1C2920]"
                            />
                        ))}
                    </aside>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#151D18]"
                            >
                                {/* Image */}
                                <div className="h-52 bg-gray-200 dark:bg-[#1C2920]" />

                                {/* Card Content */}
                                <div className="space-y-4 p-5">
                                    <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-[#1C2920]" />

                                    <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-[#1C2920]" />

                                    <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-[#1C2920]" />

                                    <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-[#1C2920]" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
};

export default loading;