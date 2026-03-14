/**
 * EDIT THESE VARIABLES TO CUSTOMIZE YOUR STORE
 */

export const STORE_NAME = "SHUBH MULTI SERVICES";
export const STORE_LOCATION = "Darbhanga, Bihar";

export const PRODUCT_NAME = "Premium RO Water Purifier Service";
export const PRODUCT_DESCRIPTION = "Expert RO servicing, AMC, and new installations. We ensure your family gets the purest water with our professional multi-service approach.";
export const PRICE_PER_UNIT = 499; // Changed from 49 to 499 as 49 is too low for RO service in INR
export const CURRENCY = "INR";

export const PRODUCT_TYPES = [
  "Service", 
  "WAMC", 
  "AMC", 
  "NEW-RO", 
  "NEW-PURIFIRE"
] as const;

export const DEFAULT_COUNTRY = "INDIA";

export const BENEFITS = [
  {
    title: "Expert Technicians",
    description: "Highly trained professionals with years of experience in RO systems.",
    icon: "ShieldCheck"
  },
  {
    title: "Genuine Parts",
    description: "We only use high-quality, authentic replacement filters and parts.",
    icon: "Settings"
  },
  {
    title: "Quick Response",
    description: "Fast doorstep service across Darbhanga within 24-48 hours.",
    icon: "Zap"
  }
];

export const FAQ = [
  {
    question: "What is included in a standard RO service?",
    answer: "A standard service includes filter cleaning, TDS check, membrane inspection, and overall system health checkup."
  },
  {
    question: "How often should I service my RO purifier?",
    answer: "We recommend a professional service every 3-6 months depending on your water usage and source water quality."
  },
  {
    question: "Do you provide warranty on spare parts?",
    answer: "Yes, all genuine spare parts replaced by us come with a standard manufacturer warranty."
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Book Your Service",
    description: "Fill out the simple order form with your details and service type."
  },
  {
    step: "02",
    title: "Confirmation Call",
    description: "Our team will call you to confirm the appointment and address."
  },
  {
    step: "03",
    title: "Doorstep Service",
    description: "Pay cash only after the service is completed to your satisfaction."
  }
];
