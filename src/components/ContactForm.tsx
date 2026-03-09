import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  techStack: z.string().optional(),
  squareFootage: z.string().optional(),
  seekingFunding: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
  "Advanced Surveillance",
  "Smart Automation",
  "Web-App & Software",
  "IT Consulting",
  "Solar Solutions",
  "AV Studio",
  "Lifecycle & Venture Consulting",
];

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      techStack: "",
      squareFootage: "",
      seekingFunding: "",
      message: "",
    },
  });

  const selectedService = form.watch("service");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format the message with conditional data
      let formattedMessage = "";
      if (selectedService === "Web-App & Software" && data.techStack) {
        formattedMessage += `[Current Tech Stack: ${data.techStack}]\n\n`;
      }
      if (
        (selectedService === "Advanced Surveillance" || selectedService === "Smart Automation") &&
        data.squareFootage
      ) {
        formattedMessage += `[Property Square Footage: ${data.squareFootage} sq ft]\n\n`;
      }
      if (selectedService === "Lifecycle & Venture Consulting" && data.seekingFunding) {
        formattedMessage += `[Seeking Private Funding/VC Investment: ${data.seekingFunding}]\n\n`;
      }
      formattedMessage += data.message;

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        company: data.company || "",
        service: data.service,
        message: formattedMessage,
      };

      // Mock API call - replace with actual endpoint
      const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com/contact';
      
      // We'll simulate the API call here to ensure the UI works
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      /* 
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit form");
      */

      setIsSuccess(true);
      toast.success("Message sent successfully! We'll be in touch soon.");
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ["name", "email", "phone", "company"];
    } else if (step === 2) {
      fieldsToValidate = ["service"];
    }

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center space-y-4 bg-card rounded-2xl border shadow-sm"
      >
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-display font-semibold">Message Received</h3>
        <p className="text-muted-foreground max-w-md">
          Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setIsSuccess(false);
            setStep(1);
            form.reset();
          }}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold">Step {step} of 3</h3>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/40" : "w-4 bg-primary/10"
              }`}
            />
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base">What do you need help with? *</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <div
                            key={service}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              field.value === service
                                ? "border-primary bg-primary/5"
                                : "border-muted hover:border-primary/50"
                            }`}
                            onClick={() => field.onChange(service)}
                          >
                            <span className={`font-medium ${field.value === service ? "text-primary" : "text-foreground"}`}>
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {selectedService === "Web-App & Software" && (
                  <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Tech Stack (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. React, Node.js, PostgreSQL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {(selectedService === "Advanced Surveillance" || selectedService === "Smart Automation") && (
                  <FormField
                    control={form.control}
                    name="squareFootage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Square Footage</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 2500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Details *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project goals, timeline, and budget..." 
                          className="min-h-[150px] resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-6 border-t mt-8">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
