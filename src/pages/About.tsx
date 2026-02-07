import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Lightbulb,
  Handshake,
  Globe,
  Award,
  Building,
  Coffee,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";

const About = () => {
  const eventExperience = [
    { icon: Users, text: "Structured one-on-one interaction sessions" },
    { icon: MessageSquare, text: "Open networking with education professionals" },
    { icon: Lightbulb, text: "Opportunity to present and understand services" },
    { icon: Target, text: "Exchange of ideas, insights, and opportunities" },
    { icon: Handshake, text: "Building long-term professional relationships" },
    { icon: Globe, text: "Exploring local & global collaborations" },
  ];

  const whyTajHotel = [
    "Meaningful conversations",
    "Comfortable networking",
    "High-quality interactions",
    "A world-class event experience",
  ];

  const delegateBenefits = [
    { icon: Users, text: "Direct one-on-one access to professionals" },
    { icon: Target, text: "Strong networking with decision-makers" },
    { icon: Globe, text: "Exposure to new markets and partnerships" },
    { icon: Award, text: "Global connection opportunities" },
    { icon: TrendingUp, text: "Business expansion and growth potential" },
    { icon: Lightbulb, text: "Valuable industry insights" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
            >
              About <span className="text-accent">1XEdu Business Meet</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-white/70"
            >
              A focused and curated networking platform designed to create real
              conversations and real business opportunities
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding relative overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  Our <span className="gradient-text">Mission</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  1XEdu Business Meet is a focused and curated networking platform
                  designed to create real conversations and real business opportunities
                  within the education industry.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This event brings together educational consultants, counsellors, and
                  education service providers under one roof, offering direct one-on-one
                  interaction opportunities that help professionals connect, collaborate,
                  and grow—both locally and globally.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike traditional networking events, this business meet ensures that
                  every delegate gets the chance to interact with others, making every
                  connection meaningful and purposeful. If you're looking to expand your
                  reach, build international connections, or explore new collaborations,
                  1XEdu Business Meet is where education meets opportunity.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Focused", desc: "Curated networking" },
                  { icon: Handshake, label: "One-on-One", desc: "Direct interactions" },
                  { icon: Globe, label: "Global", desc: "International reach" },
                  { icon: TrendingUp, label: "Growth", desc: "Business expansion" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-card rounded-2xl p-6 text-center border shadow-lg card-hover"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Event Experience */}
      <section className="section-padding bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Event <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                During this 5-hour one-day business meet, delegates will experience
                meaningful connections and valuable opportunities.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {eventExperience.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-card rounded-2xl p-6 border shadow-lg h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{item.text}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.6}>
            <p className="text-center text-muted-foreground mt-12 text-lg italic">
              Every delegate gets the chance to connect, converse, and collaborate.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Event Details & Venue */}
      <section className="section-padding relative overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Event Details */}
            <AnimatedSection direction="right">
              <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 md:p-10 h-full">
                <h2 className="text-3xl font-display font-bold mb-8">
                  Event <span className="text-accent">Details</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: Calendar, label: "Date", value: "14th February 2026" },
                    { icon: Clock, label: "Duration", value: "5 Hours" },
                    { icon: MapPin, label: "Venue", value: "Taj Hotel, Bangalore" },
                    { icon: Building, label: "Industry", value: "Education & Training" },
                    { icon: Users, label: "Participants", value: "100+ Education Professionals" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">{item.label}</p>
                        <p className="font-semibold text-lg">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Why Taj Hotel */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-display font-bold mb-4">
                    Why <span className="gradient-text">Taj Hotel, Bangalore?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    A premium and professional business environment that supports
                    impactful education-focused business networking.
                  </p>
                </div>

                <div className="space-y-4">
                  {whyTajHotel.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 bg-card rounded-xl p-4 border shadow-sm"
                    >
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                      <p className="font-medium">{item}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="text-muted-foreground italic">
                  The perfect setting for impactful education-focused business networking.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits for Delegates */}
      <section className="section-padding bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Benefits for <span className="text-accent">Delegates</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {delegateBenefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-secondary-foreground/90 pt-1">{benefit.text}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Connect & Grow?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Join 1XEdu Business Meet and experience powerful networking
              designed exclusively for the education industry.
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
