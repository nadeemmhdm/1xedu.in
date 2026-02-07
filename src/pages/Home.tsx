import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Handshake,
  Globe,
  TrendingUp,
  Award,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import FloatingElements from "@/components/FloatingElements";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const benefits = [
    { icon: Target, text: "Structured one-on-one business networking" },
    { icon: Handshake, text: "Guaranteed interaction with fellow delegates" },
    { icon: Users, text: "Meet 100+ education professionals" },
    { icon: Globe, text: "Explore global connection opportunities" },
    { icon: TrendingUp, text: "Enhance your business visibility and growth" },
    { icon: Award, text: "Focused, result-oriented networking environment" },
  ];

  const stats = [
    { value: 100, suffix: "+", label: "Education Professionals" },
    { value: 5, label: "Hours of Networking" },
    { value: 1, label: "Day Event" },
    { value: 50, suffix: "+", label: "Business Opportunities" },
  ];

  const eventHighlights = [
    "Not a crowd-based event – quality over quantity",
    "Equal opportunity for all delegates to interact",
    "One-on-one focused discussions",
    "Education-industry specific networking",
    "Designed for real outcomes, not just contacts",
  ];

  const whoShouldAttend = [
    "Educational Consultants",
    "Study Abroad Counsellors",
    "Admission & Career Counsellors",
    "Education Service Providers",
    "Training & Coaching Institutes",
    "Education Entrepreneurs",
    "Education-focused Agencies",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient" />
        
        <FloatingElements />

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-white/90 text-sm font-medium">
                Premium Business Networking Event
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              1XEdu Business Meet{" "}
              <span className="text-accent">2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 font-display italic mb-8"
            >
              Where Education Meets Opportunity
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-white/70 max-w-3xl mx-auto mb-10"
            >
              A premium one-on-one business networking event exclusively for
              educational consultants, counsellors, and education service providers.
            </motion.p>

            {/* Event Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto"
            >
              {[
                { icon: Calendar, label: "Date", value: "14th February 2026" },
                { icon: Clock, label: "Duration", value: "5 Hours" },
                { icon: MapPin, label: "Venue", value: "Taj Hotel, Bangalore" },
                { icon: Users, label: "Attendees", value: "100+ Professionals" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary-gradient px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-2 pulse-glow"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="https://wa.me/919946211243" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-8 py-4 rounded-full text-lg font-semibold text-white hover:bg-white/20 transition-all"
                >
                  WhatsApp Us
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="stat-number mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix || ""} />
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding relative overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-display font-bold">
                  About{" "}
                  <span className="gradient-text">1XEdu Business Meet</span>
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
                  connection meaningful and purposeful.
                </p>
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="inline-flex items-center gap-2 text-primary font-semibold"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card rounded-3xl p-8 shadow-xl border">
                  <h3 className="text-2xl font-display font-bold mb-6">
                    Why Attend This Event?
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-foreground/80 pt-2">{benefit.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                What Makes Us{" "}
                <span className="text-accent">Different?</span>
              </h2>
              <p className="text-secondary-foreground/70 text-lg">
                This is a high-impact, time-efficient business meet where every
                participant matters.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {eventHighlights.map((highlight, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-secondary-foreground/90">{highlight}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="section-padding relative overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Who Should <span className="gradient-text">Attend?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                This event is ideal for professionals in the education industry looking
                to expand their network and explore new opportunities.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whoShouldAttend.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card-hover bg-card rounded-2xl p-6 text-center border shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{item}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
        </div>
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
            <p className="text-xl text-white/80 mb-4 font-display italic">
              One Day. One Platform. Unlimited Opportunities.
            </p>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto">
              Join 1XEdu Business Meet and experience a powerful way of networking
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

export default Home;
