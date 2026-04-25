import React from "react";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, Share2, UserCheck, Mail, Clock, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Amar Shikkhok",
  description: "Comprehensive privacy policy detailing how Amar Shikkhok protects and manages your data.",
};

const PrivacyPolicyPage = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-16 lg:py-24">
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-primary/10 blur-[120px]" />
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            At Amar Shikkhok, we value your trust. This policy explains how we handle your personal data with transparency and care.
          </p>
          <p className="mt-8 text-sm font-medium text-primary">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-12 lg:gap-16">

            {/* 1. Overview */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">1. Introduction & Scope</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Amar Shikkhok (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates a platform connecting students with qualified tutors. This Privacy Policy outlines our commitment to protecting the personal information of our users (&quot;you&quot;). By using our services, you consent to the data practices described in this statement. This policy applies to all information collected through our website, mobile application, and related services.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 2. Information Collection */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">2. Information We Collect</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">A. Information Provided by You</h3>
                      <p className="mb-3 text-muted-foreground">We collect information you provide directly to us when creating an account, completing a profile, or communicating with us:</p>
                      <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        <li className="flex items-center gap-2">• Full name and contact details</li>
                        <li className="flex items-center gap-2">• Educational background and certificates</li>
                        <li className="flex items-center gap-2">• Profile pictures and bios</li>
                        <li className="flex items-center gap-2">• Payment and billing information</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">B. Automatically Collected Information</h3>
                      <p className="text-muted-foreground">When you access our platform, we automatically collect certain technical information, including your IP address, browser type, device information, and usage patterns through cookies and similar tracking technologies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 3. Use of Information */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">3. How We Use Your Data</h2>
                  <p className="mb-4 text-muted-foreground">Your information allows us to provide a safe and effective learning environment. Specifically, we use it to:</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Facilitate tutor-student matching",
                      "Process secure payments via Stripe",
                      "Send class reminders and updates",
                      "Improve platform performance",
                      "Verify tutor identities",
                      "Provide customer support"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 rounded-xl border border-primary/5 bg-primary/5 p-3 text-sm font-medium text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 4. Data Sharing */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">4. Information Sharing</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    We do not sell your personal data. We share your information only with your consent or as necessary to provide our services. This includes sharing profile details between students and tutors, and sharing data with trusted third-party service providers (like payment processors and cloud hosting) who are bound by strict confidentiality agreements.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 5. Data Security */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">5. Data Security & Retention</h2>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    We implement industry-standard security measures, including SSL encryption and secure server protocols, to protect your data. We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.
                  </p>
                  <div className="rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2 font-semibold text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      Retention Policy
                    </p>
                    <p className="mt-2 italic">Active account data is kept as long as the account is active. Deleted account data is anonymized or purged within 30 days, except where legal obligations require longer retention.</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* 6. Contact */}
            <div className="group relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">6. Contact Our Privacy Team</h2>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    If you have any questions about this Privacy Policy or wish to exercise your data rights (access, correction, or deletion), please reach out to us:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Email Support</p>
                      <p className="mt-1 font-bold text-primary">privacy@amarshikkhok.com</p>
                    </div>
                    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-6">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Office Address</p>
                      <p className="mt-1 font-bold text-foreground">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
