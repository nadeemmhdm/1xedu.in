import { motion } from "framer-motion";
import { Coffee, Users, Mic, Award, Utensils } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const schedule = [
    {
        time: "10:00 AM",
        title: "Registration & Welcome Coffee",
        desc: "Check-in and network with early arrivals over refreshing beverages.",
        icon: Coffee,
    },
    {
        time: "11:00 AM",
        title: "Keynote & Opening Remarks",
        desc: "Setting the stage for the future of education with industry leaders.",
        icon: Mic,
    },
    {
        time: "12:00 PM",
        title: "Structured Networking Sessions",
        desc: "Curated one-to-one meetings to foster meaningful connections.",
        icon: Users,
    },
    {
        time: "01:00 PM",
        title: "Gourmet Networking Lunch",
        desc: "Enjoy a 5-star culinary experience while continuing conversations.",
        icon: Utensils,
    },
    {
        time: "02:00 PM",
        title: "Panel Discussions & Awards",
        desc: "Insightful discussions followed by recognition of excellence.",
        icon: Award,
    },
];

const ScheduleTimeline = () => {
    return (
        <section className="py-20 bg-muted/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 mask-image-linear-gradient" />
            <div className="container mx-auto px-4 relative z-10">
                <AnimatedSection>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                            Event <span className="gradient-text">Schedule</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            A packed agenda designed for maximum interaction and value.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="max-w-4xl mx-auto">
                    <div className="relative border-l-2 border-primary/20 ml-4 md:ml-12 space-y-12 pb-12">
                        {schedule.map((item, index) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <div className="relative pl-8 md:pl-12">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[9px] md:-left-[9px] top-0 w-5 h-5 rounded-full border-4 border-background bg-primary shadow-lg" />

                                    <div className="flex flex-col md:flex-row gap-4 md:items-start group">
                                        <div className="md:w-32 flex-shrink-0">
                                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                                                {item.time}
                                            </span>
                                        </div>
                                        <div className="flex-1 bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-xl font-bold font-display">{item.title}</h3>
                                                <item.icon className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                            </div>
                                            <p className="text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleTimeline;
