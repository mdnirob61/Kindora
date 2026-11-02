'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function SignupForm() {
    const router = useRouter();

    const handleSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const image = formData.get("image") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // Password validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const { data, error } = await signUp.email({
                name,
                image,
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Registration failed. Please try again.");
                return;
            }

            if (data) {
                toast.success("Account created successfully!");
                router.push("/");
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5] px-4 py-12">

            <Card className="w-full max-w-lg border border-[#E5E7DF] bg-white shadow-xl shadow-[#123524]/5 rounded-2xl overflow-hidden">

                <div className="h-2 bg-[#B9E769]" />

                <CardHeader className="space-y-3 px-6 pt-8 sm:px-9">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#166534] text-xl">
                            🌱
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#123524]">
                            Kindora
                        </span>
                    </div>

                    <div className="space-y-2 pt-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#66913C]">
                            Join Our Community
                        </p>

                        <CardTitle className="text-3xl font-bold tracking-tight text-[#123524]">
                            Create your account
                        </CardTitle>

                        <CardDescription className="text-sm leading-6 text-gray-500">
                            Be part of something meaningful. Connect with people and
                            make a positive impact in your community.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-8 sm:px-9">
                    <form onSubmit={handleSignUp}>
                        <FieldGroup className="gap-5">

                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    required
                                    className="h-11 rounded-lg border-gray-200 bg-[#FAFAF5]/60"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
                                <Input
                                    id="image"
                                    type="url"
                                    name="image"
                                    placeholder="https://example.com/image.jpg"
                                    required
                                    className="h-11 rounded-lg border-gray-200 bg-[#FAFAF5]/60"
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    required
                                    className="h-11 rounded-lg border-gray-200 bg-[#FAFAF5]/60"
                                />
                                <FieldDescription className="text-xs text-gray-400">
                                    Your email will only be used for account-related communication.
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    required
                                    className="h-11 rounded-lg border-gray-200 bg-[#FAFAF5]/60"
                                />
                                <FieldDescription className="text-xs text-gray-400">
                                    At least 6 characters, including one uppercase and one lowercase letter.
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    required
                                    className="h-11 rounded-lg border-gray-200 bg-[#FAFAF5]/60"
                                />
                                <FieldDescription className="text-xs text-gray-400">
                                    Enter the same password again.
                                </FieldDescription>
                            </Field>

                            <Field className="gap-4 pt-2">
                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-lg bg-[#166534] text-base font-semibold text-white hover:bg-[#123524]"
                                >
                                    Create Account →
                                </Button>

                                <div className="relative flex items-center">
                                    <div className="grow border-t border-gray-200" />
                                    <span className="px-3 text-xs text-gray-400">OR</span>
                                    <div className="grow border-t border-gray-200" />
                                </div>

                                <Button
                                    variant="outline"
                                    type="button"
                                    className="h-11 w-full rounded-lg border-gray-200 font-semibold text-[#123524] hover:bg-[#FAFAF5]"
                                >
                                    Sign up with Google
                                </Button>

                                <FieldDescription className="pt-2 text-center text-sm text-gray-500">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-[#166534] hover:underline"
                                    >
                                        Sign in
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