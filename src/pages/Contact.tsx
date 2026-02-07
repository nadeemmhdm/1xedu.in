import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { contactSchema, type ContactFormData } from "@/lib/validation";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    reset();
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Call / WhatsApp",
      value: "9946211243",
      href: "tel:9946211243",
      action: "Call Now",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "9946211243",
      href: "https://wa.me/919946211243",
      action: "Message Us",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@1xedu.com",
      href: "mailto:info@1xedu.com",
      action: "Send Email",
    },
    {
      icon: MapPin,
      label: "Venue",
      value: "Taj Hotel, Bangalore",
      href: "https://maps.google.com/?q=Taj+Hotel+Bangalore",
      action: "Get Directions",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-secondary">
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
              Get in <span className="text-accent">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-white/70"
            >
              Have questions? We'd love to hear from you. Reach out to us for any
              inquiries about the event.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding relative overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <AnimatedSection direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-display font-bold mb-4">
                    Contact <span className="gradient-text">Information</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Feel free to reach out to us through any of the following channels.
                    We're here to help!
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-card rounded-2xl p-6 border shadow-lg card-hover block"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold text-foreground mb-3">{item.value}</p>
                      <span className="text-sm text-primary font-medium">
                        {item.action} →
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* Event Quick Info */}
                <div className="bg-secondary text-secondary-foreground rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">
                    Event Quick Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span>14th February 2026</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <span>5-Hour Power Session</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span>Taj Hotel, Bangalore</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="bg-card rounded-3xl p-8 md:p-10 border shadow-xl">
                <h2 className="text-2xl font-display font-bold mb-6">
                  Send us a Message
                </h2>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground">
                      We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="input-focus"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="input-focus"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What is this about?"
                        className="input-focus"
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        className="input-focus min-h-[120px]"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary-gradient py-6 text-lg"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
