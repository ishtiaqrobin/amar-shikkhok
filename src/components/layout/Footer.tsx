import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">AmarShikkhok</h3>
                        <p className="text-sm text-muted-foreground">
                            Connect with expert tutors and learn anything you want.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/tutors"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Find Tutors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Students */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">For Students</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/register"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-dashboard"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    My Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Tutors */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">For Tutors</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/register"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Become a Tutor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tutor-dashboard"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Tutor Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} AmarShikkhok. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link
                            href="/privacy"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
