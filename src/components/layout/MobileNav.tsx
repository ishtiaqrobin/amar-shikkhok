"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileNavProps {
    menu: Array<{
        title: string;
        url: string;
    }>;
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

export function MobileNav({ menu, auth }: MobileNavProps) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                    {menu.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium hover:text-primary transition-colors"
                        >
                            {item.title}
                        </Link>
                    ))}

                    {auth && (
                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                            <Button asChild variant="outline" onClick={() => setOpen(false)}>
                                <Link href={auth.login.url}>{auth.login.title}</Link>
                            </Button>
                            <Button asChild onClick={() => setOpen(false)}>
                                <Link href={auth.signup.url}>{auth.signup.title}</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
