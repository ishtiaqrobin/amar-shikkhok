import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">যোগাযোগ করুন</h1>
                <p className="text-xl text-muted-foreground">
                    আপনার যেকোনো প্রশ্ন বা পরামর্শ আমাদের জানান। আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করব।
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Info Cards */}
                <div className="space-y-6 lg:col-span-1">
                    {[
                        { icon: Mail, label: "ইমেইল", value: "info@amarshikkhok.com" },
                        { icon: Phone, label: "ফোন", value: "+৮৮০ ১৮০০ ৩০০ ৩০০" },
                        { icon: MapPin, label: "ঠিকানা", value: "বনানী, ঢাকা, বাংলাদেশ" },
                    ].map((info, i) => (
                        <Card key={i} className="border-primary/10 overflow-hidden">
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
                                    <label className="text-sm font-medium">নাম</label>
                                    <Input placeholder="আপনার নাম লিখুন" className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">ইমেইল</label>
                                    <Input placeholder="আপনার ইমেইল" type="email" className="h-12 rounded-xl" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">বিষয়</label>
                                <Input placeholder="কি নিয়ে যোগাযোগ করতে চান?" className="h-12 rounded-xl" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">বার্তা</label>
                                <Textarea
                                    placeholder="আপনার বার্তাটি এখানে লিখুন..."
                                    className="min-h-[150px] rounded-xl resize-none"
                                />
                            </div>

                            <Button className="w-full md:w-auto h-12 px-8 rounded-full gap-2">
                                <Send className="h-4 w-4" /> বার্তা পাঠান
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
