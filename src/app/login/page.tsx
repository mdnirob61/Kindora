'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm() {
    const router = useRouter();

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        try {
            const { data, error } = await signIn.email({
                ...user,
            });

            if (error) {
                toast.error(error.message || "Login failed. Please check your credentials.");
                return;
            }

            if (data) {
                toast.success("Welcome back! Login successful.");
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await signIn.social({
            provider: "google",
        });
        // console.log(data)
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFAF5] px-4 py-12 transition-colors duration-300 dark:bg-[#101812]">

            {/* Background Decorations */}
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#B9E769]/20 blur-3xl dark:bg-lime-400/10" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#166534]/10 blur-3xl dark:bg-green-500/10" />

            <Card className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[#E5E7DF] bg-white shadow-2xl shadow-[#123524]/10 dark:border-green-900/50 dark:bg-[#151D18]">

                {/* Top Accent */}
                <div className="h-2 bg-[#B9E769]" />

                <CardHeader className="space-y-4 px-6 pt-9 sm:px-10">

                    {/* Logo */}
                    <Link href="/" className="flex w-fit items-center gap-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#166534] text-2xl">
                            🌱
                        </div>

                        <span className="text-2xl font-bold tracking-tight text-[#123524] dark:text-gray-100">
                            Kindora
                        </span>
                    </Link>

                    {/* Heading */}
                    <div className="space-y-2 pt-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#66913C] dark:text-lime-400">
                            Welcome Back
                        </p>

                        <CardTitle className="text-3xl font-bold tracking-tight text-[#123524] dark:text-gray-100">
                            Login to your account
                        </CardTitle>

                        <CardDescription className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Welcome back to Kindora! Sign in to discover events,
                            connect with your community, and make a difference.
                        </CardDescription>
                    </div>

                </CardHeader>

                <CardContent className="px-6 pb-9 pt-6 sm:px-10">

                    <form onSubmit={handleLogin}>
                        <FieldGroup className="gap-5">

                            {/* Email */}
                            <Field>
                                <FieldLabel
                                    htmlFor="email"
                                    className="font-semibold text-[#123524] dark:text-gray-200"
                                >
                                    Email Address
                                </FieldLabel>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="h-12 rounded-lg border-gray-200 bg-[#FAFAF5]/60 focus-visible:ring-[#166534] dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus-visible:ring-lime-400"
                                />
                            </Field>

                            {/* Password */}
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel
                                        htmlFor="password"
                                        className="font-semibold text-[#123524] dark:text-gray-200"
                                    >
                                        Password
                                    </FieldLabel>
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="h-12 rounded-lg border-gray-200 bg-[#FAFAF5]/60 focus-visible:ring-[#166534] dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus-visible:ring-lime-400"
                                />
                            </Field>

                            {/* Login Button */}
                            <Field className="gap-4 pt-2">
                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-lg bg-[#166534] text-base font-semibold text-white shadow-md shadow-[#166534]/15 transition-all hover:bg-[#123524] dark:bg-lime-400 dark:text-green-950 dark:hover:bg-lime-300"
                                >
                                    Login to Your Account
                                    <span className="ml-1">→</span>
                                </Button>

                                {/* Divider */}
                                <div className="relative flex items-center">
                                    <div className="grow border-t border-gray-200 dark:border-green-900/50" />
                                    <span className="px-3 text-xs font-medium text-gray-400 dark:text-gray-500">
                                        OR CONTINUE WITH
                                    </span>
                                    <div className="grow border-t border-gray-200 dark:border-green-900/50" />
                                </div>

                                {/* Google Button */}
                                <Button
                                    onClick={handleGoogleSignIn}
                                    variant="outline"
                                    type="button"
                                    className="h-12 w-full rounded-lg border-gray-200 font-semibold text-[#123524] transition-colors hover:bg-[#FAFAF5] dark:border-green-900/60 dark:bg-[#1C2920] dark:text-gray-200 dark:hover:bg-[#26372B]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        className="mr-2 h-5 w-5"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1 1 24 12a11.8 11.8 0 0 1 7.5 2.7l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.3-.4-3.5Z"
                                        />
                                        <path
                                            fill="#FF3D00"
                                            d="m6.3 14.7 6.6 4.8A12 12 0 0 1 31.5 14.7l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
                                        />
                                        <path
                                            fill="#4CAF50"
                                            d="M24 44a20 20 0 0 0 13.2-5l-6.1-5.2A12 12 0 0 1 12.8 28l-6.5 5A20 20 0 0 0 24 44Z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.2 5.8l6.1 5.2A20 20 0 0 0 44 24c0-1.2-.1-2.3-.4-3.5Z"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>

                                {/* Signup Link */}
                                <FieldDescription className="pt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href="/signup"
                                        className="font-semibold text-[#166534] underline-offset-4 hover:underline dark:text-lime-400"
                                    >
                                        Create an account
                                    </Link>
                                </FieldDescription>

                            </Field>

                        </FieldGroup>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}