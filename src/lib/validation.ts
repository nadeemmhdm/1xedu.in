import { z } from "zod";

// Professional email domains (allowed)
const professionalDomains = [
  "gmail.com",
  "zoho.com",
  "zohomail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "icloud.com",
  "protonmail.com",
  "aol.com",
  "msn.com",
  "me.com",
  // Common business domains
  "microsoft.com",
  "google.com",
  "apple.com",
];

// Temporary/disposable email domains (blocked)
const blockedDomains = [
  "tempmail.com",
  "throwaway.com",
  "guerrillamail.com",
  "mailinator.com",
  "10minutemail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "trashmail.com",
  "yopmail.com",
  "getnada.com",
  "maildrop.cc",
  "discard.email",
  "sharklasers.com",
  "spam4.me",
  "mytemp.email",
  "tempr.email",
  "dispostable.com",
  "throwawaymail.com",
  "tempinbox.com",
  "burnermail.io",
];

// Validate email - allow professional emails, block temp emails
const emailValidator = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters")
  .refine((email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    
    // Block known temporary email domains
    if (blockedDomains.some((blocked) => domain.includes(blocked))) {
      return false;
    }
    
    // Allow professional domains or any custom business domain
    const isProfessional = professionalDomains.some((prof) => domain === prof);
    const isBusinessDomain = !blockedDomains.some((blocked) => domain.includes(blocked));
    
    return isProfessional || isBusinessDomain;
  }, "Please use a professional email address. Temporary/disposable emails are not allowed.");

// Phone number validation
const phoneValidator = z
  .string()
  .trim()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must be at most 15 digits")
  .regex(/^\d+$/, "Phone number must contain only digits")
  .refine((phone) => {
    // Basic validation for Indian numbers (10 digits starting with 6-9)
    if (phone.length === 10) {
      return /^[6-9]\d{9}$/.test(phone);
    }
    // For international numbers, just check length
    return phone.length >= 10 && phone.length <= 15;
  }, "Please enter a valid phone number");

// Indian states list
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// Country codes with dial codes
export const countryCodes = [
  { code: "IN", dialCode: "+91", name: "India" },
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "AE", dialCode: "+971", name: "United Arab Emirates" },
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "SG", dialCode: "+65", name: "Singapore" },
  { code: "MY", dialCode: "+60", name: "Malaysia" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "FR", dialCode: "+33", name: "France" },
  { code: "NZ", dialCode: "+64", name: "New Zealand" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia" },
  { code: "QA", dialCode: "+974", name: "Qatar" },
  { code: "KW", dialCode: "+965", name: "Kuwait" },
  { code: "OM", dialCode: "+968", name: "Oman" },
  { code: "BH", dialCode: "+973", name: "Bahrain" },
];

// Registration form schema
export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters, spaces, dots, hyphens, and apostrophes"),
  
  email: emailValidator,
  
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(150, "Company name must be less than 150 characters"),
  
  mobileCountryCode: z.string().min(1, "Country code is required"),
  
  mobileNumber: phoneValidator,
  
  whatsappCountryCode: z.string().min(1, "Country code is required"),
  
  whatsappNumber: phoneValidator,
  
  state: z.string().min(1, "State is required"),
  
  otherState: z.string().optional(),
  
  place: z
    .string()
    .trim()
    .min(2, "Place must be at least 2 characters")
    .max(100, "Place must be less than 100 characters"),
  
  lunchPreference: z.enum(["veg", "nonveg"], {
    required_error: "Please select your lunch preference",
  }),
}).refine((data) => {
  // If state is "Other", otherState must be provided
  if (data.state === "Other") {
    return data.otherState && data.otherState.trim().length >= 2;
  }
  return true;
}, {
  message: "Please specify your state/region",
  path: ["otherState"],
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  
  email: emailValidator,
  
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
