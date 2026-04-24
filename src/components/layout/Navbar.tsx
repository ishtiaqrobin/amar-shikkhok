"use client";

import { useState } from "react";
import { Menu, User, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/hooks/useAuth";
import { LogoutButton } from "@/components/modules/authentication/LogoutButton";
import logo from "@/assets/images/logo.webp";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
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

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Categories",
      url: "/categories",
    },
    {
      title: "Tutors",
      url: "/tutors",
    },
    {
      title: "About Us",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getDashboardUrl = () => {
    if (user?.role === "ADMIN") return "/admin-dashboard";
    if (user?.role === "TUTOR") return "/tutor-dashboard";
    return "/student-dashboard";
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.url && item.url !== "/";
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          asChild
          className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground",
            isActive && "bg-muted text-primary font-semibold"
          )}
        >
          <Link href={item.url}>{item.title}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.url && item.url !== "/";
    return (
      <Link
        key={item.title}
        href={item.url}
        onClick={() => setIsOpen(false)}
        className={cn(
          "text-md font-semibold transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <section className={cn("py-4 border-b", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex ">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                className="max-h- dark:invert"
                alt="Amar Shikkhok"
                width={32}
                height={32}
              />
              <span className="text-lg font-bold tracking-tighter">
                Amar <span className="text-primary">Shikkhok</span>
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <ModeToggle />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image || undefined} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        Role: {user?.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardUrl()} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutButton variant="ghost" className="w-full justify-start px-2" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Hamburger Menu - Always visible on mobile */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                        <Image
                          src={logo}
                          className="max-h-8 dark:invert"
                          alt="Amar Shikkhok"
                          width={32}
                          height={32}
                        />
                        <span className="text-lg font-bold tracking-tighter">
                          Amar <span className="text-primary">Shikkhok</span>
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      {isAuthenticated ? (
                        <>
                          <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                            <Link href={getDashboardUrl()}>Dashboard</Link>
                          </Button>
                          <LogoutButton variant="default" className="w-full" />
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
                            <Link href={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                          <Button asChild onClick={() => setIsOpen(false)}>
                            <Link href={auth.signup.url}>{auth.signup.title}</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={logo}
                  className="max-h-8 dark:invert"
                  alt="Amar Shikkhok"
                  width={32}
                  height={32}
                />
                <span className="text-lg font-bold tracking-tighter">
                  Amar <span className="text-primary">Shikkhok</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <ModeToggle />

              {/* Profile Dropdown (Mobile) - Only if Authenticated */}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.image || undefined} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground mt-1">
                          Role: {user?.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardUrl()} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <LogoutButton variant="ghost" className="w-full justify-start px-2" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
