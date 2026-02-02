import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Users, Lightbulb, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Our Mission & Vision
        </h1>
        <p className="max-w-[800px] mx-auto text-xl text-muted-foreground leading-relaxed">
          At Amar Shikkhok, we believe that education should be accessible to everyone.
          We connect students with the right mentors to help them reach their full potential.
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Accessible Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We make it easy to find and book expert tutors from the comfort of your home.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Expert Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform features highly qualified teachers across various subjects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm rounded-3xl">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Personalized Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tailored sessions to match your individual learning pace and goals.
                </p>
              </CardContent>
            </Card>
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
            <h2 className="text-3xl font-bold">Why We Are Different</h2>
            <div className="space-y-4">
              {[
                "Verified Expert Teachers",
                "Easy Payment & Booking System",
                "Live Sessions & Mock Tests",
                "Enhanced Student Feedback & Guidance",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25">
              <Link href="/register">Join Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
