import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Building,
  Phone,
  MessageSquare,
  MapPin,
  Utensils,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import {
  registrationSchema,
  type RegistrationFormData,
  indianStates,
  countryCodes,
} from "@/lib/validation";

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      mobileCountryCode: "+91",
      whatsappCountryCode: "+91",
    },
  });

  const watchState = watch("state");
  const totalSteps = 3;

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["name", "email", "companyName"];
    } else if (step === 2) {
      fieldsToValidate = ["mobileCountryCode", "mobileNumber", "whatsappCountryCode", "whatsappNumber"];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call / payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In production, redirect to Razorpay here
    // For now, simulate success
    const razorpayLink = "https://razorpay.com/pay/example";
    
    // Open Razorpay link
    window.open(razorpayLink, "_blank");
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Registration Initiated!",
      description: "Please complete the payment to confirm your registration.",
    });
  };

  const stepIcons = [
    { icon: User, label: "Personal Info" },
    { icon: Phone, label: "Contact Details" },
    { icon: MapPin, label: "Location & Preferences" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-secondary">
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
              Register <span className="text-accent">Now</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-white/70"
            >
              Secure your spot at India's premier education business networking event
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="section-padding relative overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {isSuccess ? (
              <AnimatedSection>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-3xl p-8 md:p-12 border shadow-xl text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">
                    Registration Initiated!
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Please complete the payment on Razorpay to confirm your registration.
                    You will receive a confirmation email once the payment is successful.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => window.open("https://razorpay.com/pay/example", "_blank")}
                      className="btn-primary-gradient px-8 py-6 text-lg"
                    >
                      Complete Payment
                      <CreditCard className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSuccess(false);
                        setStep(1);
                      }}
                      className="px-8 py-6 text-lg"
                    >
                      Register Another
                    </Button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ) : (
              <AnimatedSection>
                <div className="bg-card rounded-3xl p-8 md:p-10 border shadow-xl">
                  {/* Progress Steps */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                      {stepIcons.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <motion.div
                            animate={{
                              scale: step === index + 1 ? 1.1 : 1,
                              backgroundColor:
                                step > index
                                  ? "hsl(var(--primary))"
                                  : step === index + 1
                                  ? "hsl(var(--primary))"
                                  : "hsl(var(--muted))",
                            }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                              step >= index + 1
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step > index + 1 ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <item.icon className="w-6 h-6" />
                            )}
                          </motion.div>
                          <span
                            className={`text-xs mt-2 hidden sm:block ${
                              step >= index + 1
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                        className="absolute inset-y-0 left-0 bg-primary rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                      {/* Step 1: Personal Info */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-display font-bold mb-6">
                            Personal Information
                          </h2>

                          <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Full Name *
                            </Label>
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
                            <Label htmlFor="email" className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your professional email"
                              className="input-focus"
                              {...register("email")}
                            />
                            {errors.email && (
                              <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Use Gmail, Outlook, Zoho, or your company email. Temporary emails are not allowed.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="companyName" className="flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              Company / Organization Name *
                            </Label>
                            <Input
                              id="companyName"
                              placeholder="Enter your company or organization name"
                              className="input-focus"
                              {...register("companyName")}
                            />
                            {errors.companyName && (
                              <p className="text-sm text-destructive">
                                {errors.companyName.message}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Contact Details */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-display font-bold mb-6">
                            Contact Details
                          </h2>

                          {/* Mobile Number */}
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Mobile Number *
                            </Label>
                            <div className="flex gap-2">
                              <Select
                                value={watch("mobileCountryCode")}
                                onValueChange={(value) => setValue("mobileCountryCode", value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="+91" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countryCodes.map((country) => (
                                    <SelectItem key={country.code} value={country.dialCode}>
                                      {country.dialCode} ({country.code})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Input
                                placeholder="Enter mobile number"
                                className="input-focus flex-1"
                                {...register("mobileNumber")}
                              />
                            </div>
                            {errors.mobileNumber && (
                              <p className="text-sm text-destructive">
                                {errors.mobileNumber.message}
                              </p>
                            )}
                          </div>

                          {/* WhatsApp Number */}
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              WhatsApp Number *
                            </Label>
                            <div className="flex gap-2">
                              <Select
                                value={watch("whatsappCountryCode")}
                                onValueChange={(value) => setValue("whatsappCountryCode", value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="+91" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countryCodes.map((country) => (
                                    <SelectItem key={country.code} value={country.dialCode}>
                                      {country.dialCode} ({country.code})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Input
                                placeholder="Enter WhatsApp number"
                                className="input-focus flex-1"
                                {...register("whatsappNumber")}
                              />
                            </div>
                            {errors.whatsappNumber && (
                              <p className="text-sm text-destructive">
                                {errors.whatsappNumber.message}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Location & Preferences */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-2xl font-display font-bold mb-6">
                            Location & Preferences
                          </h2>

                          {/* State */}
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              State *
                            </Label>
                            <Select
                              value={watch("state")}
                              onValueChange={(value) => setValue("state", value)}
                            >
                              <SelectTrigger className="input-focus">
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {indianStates.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                                <SelectItem value="Other">Other (Outside India)</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.state && (
                              <p className="text-sm text-destructive">{errors.state.message}</p>
                            )}
                          </div>

                          {/* Other State Input */}
                          {watchState === "Other" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-2"
                            >
                              <Label htmlFor="otherState">Specify State/Region *</Label>
                              <Input
                                id="otherState"
                                placeholder="Enter your state or region"
                                className="input-focus"
                                {...register("otherState")}
                              />
                              {errors.otherState && (
                                <p className="text-sm text-destructive">
                                  {errors.otherState.message}
                                </p>
                              )}
                            </motion.div>
                          )}

                          {/* Place */}
                          <div className="space-y-2">
                            <Label htmlFor="place" className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              City / Place *
                            </Label>
                            <Input
                              id="place"
                              placeholder="Enter your city or place"
                              className="input-focus"
                              {...register("place")}
                            />
                            {errors.place && (
                              <p className="text-sm text-destructive">{errors.place.message}</p>
                            )}
                          </div>

                          {/* Lunch Preference */}
                          <div className="space-y-4">
                            <Label className="flex items-center gap-2">
                              <Utensils className="w-4 h-4" />
                              Lunch Preference *
                            </Label>
                            <RadioGroup
                              value={watch("lunchPreference")}
                              onValueChange={(value: "veg" | "nonveg") =>
                                setValue("lunchPreference", value)
                              }
                              className="flex gap-6"
                            >
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="veg" id="veg" />
                                <Label
                                  htmlFor="veg"
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <span className="w-3 h-3 rounded-full bg-green-500" />
                                  Vegetarian
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="nonveg" id="nonveg" />
                                <Label
                                  htmlFor="nonveg"
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <span className="w-3 h-3 rounded-full bg-red-500" />
                                  Non-Vegetarian
                                </Label>
                              </div>
                            </RadioGroup>
                            {errors.lunchPreference && (
                              <p className="text-sm text-destructive">
                                {errors.lunchPreference.message}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={step === 1}
                        className="px-6"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      {step < totalSteps ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary-gradient px-8"
                        >
                          Next
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary-gradient px-8"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Proceed to Payment
                              <CreditCard className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            )}

            {/* Event Info Sidebar */}
            <AnimatedSection delay={0.3}>
              <div className="mt-8 bg-secondary text-secondary-foreground rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg mb-4">
                  Event Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground/70">Event</span>
                    <span className="font-medium">1XEdu Business Meet 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground/70">Date</span>
                    <span className="font-medium">14th February 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground/70">Duration</span>
                    <span className="font-medium">5 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-foreground/70">Venue</span>
                    <span className="font-medium">Taj Hotel, Bangalore</span>
                  </div>
                  <div className="border-t border-white/10 my-4" />
                  <p className="text-secondary-foreground/70 text-xs">
                    By registering, you agree to our terms and conditions. Payment is
                    non-refundable. Registration includes access to all sessions, lunch,
                    and networking opportunities.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;
