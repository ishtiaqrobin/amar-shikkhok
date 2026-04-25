import React from "react";
import { Separator } from "@/components/ui/separator";
import { FileText, UserPlus, CreditCard, Scale, AlertCircle, RefreshCcw, Handshake, Zap } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Amar Shikkhok",
  description: "Comprehensive terms and conditions for using the Amar Shikkhok platform.",
};

const TermsOfServicePage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-16 lg:py-24">
        <div className="absolute right-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-primary/20 blur-[120px]" />
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Terms of Service
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Please read these terms carefully before using our platform. They outline your rights and obligations as a user of Amar Shikkhok.
          </p>
          <p className="mt-8 text-sm font-medium text-primary">
            Effective Date: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-12 lg:gap-16">

            {/* 1. Acceptance of Terms */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Handshake className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    By registering for an account or using any part of the Amar Shikkhok platform, you agree to be bound by these Terms of Service. If you are using the platform on behalf of a minor, you represent that you are the legal guardian and agree to these terms on their behalf. If you do not agree, you must immediately cease all use of the platform.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 2. User Accounts */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">2. Account Registration & Security</h2>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    To access certain features, you must create an account. You agree to provide accurate, current, and complete information and to keep your login credentials confidential.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-primary" />
                      <span>You are solely responsible for all activities that occur under your account.</span>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-primary" />
                      <span>Tutors must provide valid educational credentials and proof of identity.</span>
                    </li>
                    <li className="flex gap-3">
                      <Zap className="h-4 w-4 shrink-0 text-primary" />
                      <span>We reserve the right to suspend or terminate accounts that provide false information.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 3. Platform Conduct */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">3. Conduct & Safety</h2>
                  <p className="mb-4 text-muted-foreground">Amar Shikkhok is a community built on respect. Users are prohibited from:</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Harassing or abusing other users",
                      "Sharing inappropriate or illegal content",
                      "Attempting to bypass platform payments",
                      "Spamming or automated scraping",
                      "Impersonating another person",
                      "Violating intellectual property rights"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs font-medium">
                        <div className="h-1 w-1 rounded-full bg-destructive" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 4. Payments & Refunds */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">4. Financial Terms</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">Payments</h3>
                      <p className="text-muted-foreground">All payments for tutoring services are processed through our secure partner, Stripe. Students agree to pay the listed hourly rate plus any applicable platform fees at the time of booking.</p>
                    </div>
                    <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
                      <h3 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                        <RefreshCcw className="h-4 w-4" />
                        Refund & Cancellation Policy
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Cancellations made more than 24 hours before a session are eligible for a full refund. Cancellations within 24 hours may be subject to a partial fee to compensate the tutor for their time. Refund disputes are handled by our support team on a case-by-case basis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 5. Limitation of Liability */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">5. Disclaimers & Liability</h2>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    Amar Shikkhok provides a marketplace for educational services. While we vet tutors, we do not guarantee the quality, accuracy, or results of any tutoring session. 
                  </p>
                  <p className="text-sm font-medium text-muted-foreground italic">
                    &quot;The platform is provided &apos;as is&apos; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.&quot;
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 6. Governing Law */}
            <div className="bg-muted/50 rounded-3xl p-8 text-center border border-border">
              <h2 className="mb-2 text-xl font-bold text-foreground">Questions About These Terms?</h2>
              <p className="mb-6 text-muted-foreground">Our legal team is here to help clarify any points in this agreement.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:legal@amarshikkhok.com" className="font-bold text-primary hover:underline">legal@amarshikkhok.com</a>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <span className="text-muted-foreground">Dhaka, Bangladesh</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
