import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-2xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Get in Touch</h1>
                <p className="text-xl text-muted-foreground">
                    Have questions or feedback? We&apos;d love to hear from you. Our team will get back to you as soon as possible.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Info Cards */}
                <div className="space-y-6 lg:col-span-1">
                    {[
                        { icon: Mail, label: "Email", value: "info@amarshikkhok.com" },
                        { icon: Phone, label: "Phone", value: "+880 1800 300 300" },
                        { icon: MapPin, label: "Address", value: "Banani, Dhaka, Bangladesh" },
                    ].map((info, i) => (
                        <Card key={i} className="border-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <info.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                                    <p className="text-lg font-semibold">{info.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Contact Form */}
                <Card className="lg:col-span-2 border-primary/10 shadow-xl rounded-3xl">
                    <CardContent className="p-8 md:p-12">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <Input placeholder="Enter your name" className="h-12 rounded-xl border-primary/20 focus:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input placeholder="Enter your email" type="email" className="h-12 rounded-xl border-primary/20 focus:border-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject</label>
                                <Input placeholder="What is this regarding?" className="h-12 rounded-xl border-primary/20 focus:border-primary" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <Textarea
                                    placeholder="Write your message here..."
                                    className="min-h-[150px] rounded-xl resize-none border-primary/20 focus:border-primary"
                                />
                            </div>

                            <Button className="w-full md:w-auto h-12 px-8 rounded-full gap-2 shadow-lg shadow-primary/20 font-bold">
                                <Send className="h-4 w-4" /> Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
