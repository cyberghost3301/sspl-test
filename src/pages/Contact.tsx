import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().optional(),
  business: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjects = [
  "General Inquiry",
  "Project Quote",
  "Partnership",
  "Technical Support",
  "Other",
];

const quickLinks = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 9250974145",
    href: "tel:+919250974145",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "info@spirecrest.in",
    href: "mailto:info@spirecrest.in",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Head Office, Lucknow",
    href: "https://maps.app.goo.gl/AXeJGDw9scy7koxUA",
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      business: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://ssplbackend.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast.success(result.message || "Message sent successfully!");
        reset();
      } else {
        toast.error(result.message || "Failed to send. Please try again.");
      }
    } catch {
      toast.error("Connection failed. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Spirecrest Solutions | Enterprise IT Partner"
        description="Reach out to Spirecrest for enterprise IT infrastructure, surveillance systems, and custom software development. Office in Lucknow, serving all of India."
        path="/contact"
      />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        style={{
          background: `radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, #0f172a 100%), #0f172a`,
        }}
      >
        <div className="section-container text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/60 max-w-xl mx-auto"
          >
            We'd love to hear from you. Reach out through any of the channels below.
          </motion.p>
        </div>
      </section>

      {/* Quick Links */}
      <section
        className="py-12"
        style={{ background: "#0f172a" }}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickLinks.map((link, i) => (
              <motion.a
                key={link.title}
                href={link.href}
                target={link.icon === MapPin ? "_blank" : undefined}
                rel={link.icon === MapPin ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl border transition-colors hover:bg-white/[0.08]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <link.icon className="h-5 w-5 text-white/80" />
                </div>
                <div>
                  <p className="font-semibold text-white">{link.title}</p>
                  <p className="text-sm text-white/50">{link.detail}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        className="py-16 md:py-24"
        style={{
          background: `radial-gradient(ellipse at top, rgba(37, 99, 235, 0.06) 0%, #0f172a 60%), #0f172a`,
        }}
      >
        <div className="section-container max-w-3xl mx-auto">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-12 text-center space-y-4 rounded-2xl border"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(34,197,94,0.15)" }}>
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-white">Message Received</h3>
              <p className="text-white/50 max-w-md">
                Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
              </p>
              <Button
                variant="outline"
                className="mt-6 border-white/20 text-white hover:bg-white/10"
                onClick={() => setIsSuccess(false)}
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border p-6 sm:p-10"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-2xl font-display font-bold text-white mb-8">Send a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-white/80">Full Name *</Label>
                    <Input
                      {...register("name")}
                      placeholder="John Doe"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-blue-500/50"
                    />
                    {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Email Address *</Label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-blue-500/50"
                    />
                    {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-white/80">Phone Number</Label>
                    <Input
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 9250974145"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-blue-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Company Name</Label>
                    <Input
                      {...register("business")}
                      placeholder="Acme Corp"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Subject *</Label>
                  <select
                    {...register("subject")}
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-900">Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s} className="text-gray-900">{s}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-sm text-red-400">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Message *</Label>
                  <Textarea
                    {...register("message")}
                    placeholder="Tell us about your project or inquiry..."
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-blue-500/50 resize-none"
                  />
                  {errors.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* Full-Width Map */}
      <div className="w-full">
        <iframe
          title="Spirecrest Solutions Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.38275578886!2d80.7495!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          style={{ height: "40vh", border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
