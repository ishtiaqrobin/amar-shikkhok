import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, GraduationCap, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { label: "শিক্ষার্থী", value: "৫০০০+", icon: Users },
    { label: "অভিজ্ঞ শিক্ষক", value: "৫০০+", icon: GraduationCap },
    { label: "সফল সেশন", value: "১০০০০+", icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col gap-20 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          আমাদের লক্ষ্য ও উদ্দেশ্য
        </h1>
        <p className="max-w-[800px] mx-auto text-xl text-muted-foreground leading-relaxed">
          &quot;আমার শিক্ষক&quot; একটি অনলাইন প্ল্যাটফর্ম যা শিক্ষার্থী এবং অভিজ্ঞ শিক্ষকদের মধ্যে একটি আধুনিক ও সহজ যোগসূত্র স্থাপন করে। আমাদের লক্ষ্য হলো শিক্ষার সুযোগকে সবার কাছে পৌঁছানো।
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none bg-background shadow-none rounded-3xl overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-primary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="h-20 w-20 text-white opacity-50" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">কেন আমরা আলাদা?</h2>
            <div className="space-y-4">
              {[
                "যাচাইকৃত অভিজ্ঞ শিক্ষকবৃন্দ",
                "সহজ পেমেন্ট ও বুকিং সিস্টেম",
                "লাইভ সেশন ও মক টেস্টের সুবিধা",
                "শিক্ষার্থীদের উন্নত ফিডব্যাক গাইডেন্স",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/register">আজই যুক্ত হোন</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
