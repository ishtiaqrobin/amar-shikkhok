import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { label: "Find Tutors", href: "/tutors" },
            { label: "Categories", href: "/categories" },
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
        ],
        forStudents: [
            { label: "Sign Up", href: "/register" },
            { label: "Login", href: "/login" },
            { label: "My Dashboard", href: "/student-dashboard" },
            { label: "My Bookings", href: "/student-dashboard/bookings" },
        ],
        forTutors: [
            { label: "Become a Tutor", href: "/register" },
            { label: "Tutor Dashboard", href: "/tutor-dashboard" },
            { label: "My Availability", href: "/tutor-dashboard/availability" },
            { label: "My Earnings", href: "/tutor-dashboard/bookings" },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" },
    ];

    return (
        <footer className="bg-gradient-to-br from-muted/30 via-background to-muted/20 border-t border-primary/10">
            <div className="container mx-auto px-4 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all" />
                                <div className="relative bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                    <GraduationCap className="h-7 w-7" />
                                </div>
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Amar Shikkhok
                            </span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed max-w-sm">
                            Connect with expert tutors and unlock your learning potential. Quality education, personalized attention, guaranteed success.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                                <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Mail className="h-4 w-4 text-primary" />
                                </div>
                                <span>support@amarshikkhok.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                                <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Phone className="h-4 w-4 text-primary" />
                                </div>
                                <span>+880 1234-567890</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                                <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    className="bg-primary/5 hover:bg-primary hover:text-primary-foreground p-2.5 rounded-xl transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20 group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                        {/* Quick Links */}
                        <div className="space-y-5">
                            <h4 className="font-bold text-lg relative inline-block">
                                Quick Links
                                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all rounded-full" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* For Students */}
                        <div className="space-y-5">
                            <h4 className="font-bold text-lg relative inline-block">
                                For Students
                                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.forStudents.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all rounded-full" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* For Tutors */}
                        <div className="space-y-5">
                            <h4 className="font-bold text-lg relative inline-block">
                                For Tutors
                                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full" />
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.forTutors.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all rounded-full" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator className="my-10 bg-primary/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        © {currentYear} <span className="font-semibold text-foreground">Amar Shikkhok</span>. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <Link
                            href="/privacy"
                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-muted-foreground/30">•</span>
                        <Link
                            href="/terms"
                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            Terms of Service
                        </Link>
                        <span className="text-muted-foreground/30">•</span>
                        <Link
                            href="/cookies"
                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
