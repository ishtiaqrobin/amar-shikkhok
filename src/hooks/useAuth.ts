"use client";

import { authClient } from "@/lib/auth-client";
import { Session, User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();

        if (data?.session && data?.user) {
          setSession(data.session);
          setUser(data.user as User);
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const logout = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setSession(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAuthenticated = !!user && !!session;

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    logout,
  };
}
