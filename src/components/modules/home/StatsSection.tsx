"use client";

import { Users, GraduationCap, BookOpen, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { PublicStats } from "@/types/admin.type";

export function StatsSection() {
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await adminService.getPublicStats();
        if (data) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      label: "Happy Learners",
      value: stats ? `${stats.totalStudents.toLocaleString()}+` : "10,000+",
      icon: <Users className="h-6 w-6 text-primary" />,
      description: "Students joined our community",
    },
    {
      label: "Expert Tutors",
      value: stats ? `${stats.totalTutors.toLocaleString()}+` : "500+",
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      description: "Verified and professional educators",
    },
    {
      label: "Subjects Covered",
      value: stats ? `${stats.totalCategories.toLocaleString()}+` : "100+",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      description: "Wide range of topics to learn",
    },
    {
      label: "Avg. Rating",
      value: stats ? `${stats.avgRating}/5` : "4.9/5",
      icon: <Star className="h-6 w-6 text-primary" />,
      description: "Top rated tutoring service",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-primary/10 mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-foreground mb-1">
                {loading ? (
                  <span className="h-10 w-24 bg-muted animate-pulse rounded block"></span>
                ) : (
                  stat.value
                )}
              </h3>
              <p className="text-lg font-semibold text-primary mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground text-center">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
