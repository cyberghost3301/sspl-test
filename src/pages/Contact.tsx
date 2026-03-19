import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { m as motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2,
  Shield,
  Clock,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/* ─── Schema ─────────────────────────────────────────────────────────── */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100), // required
  company: z.string().trim().max(200).optional(), // optional
  email: z.string().trim().email("Invalid email address").max(255), // required
  phone: z.string().trim().optional(), // optional
  scope: z.string().min(1, "Please select a scope"), // required
  message: z.string().trim().max(2000).optional(), // optional
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ─── Options ────────────────────────────────────────────────────────── */
const scopeOptions = [
  "General Inquiry",
  "Service Request",
  "Job Opportunities",
  "Partnership Opportunity",
  "Technical Support",
  "Feedback / Suggestion",
  "Other",
];

/* ─── Quick-action buttons ───────────────────────────────────────────── */
const quickActions = [
  {
    icon: Phone,
    label: "Call Us",
    sub: "+91 92509 74145",
    href: "tel:+919250974145",
    gradient: "from-blue-600/20 to-blue-500/10",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Mail,
    label: "Email Us",
    sub: "info@spirecrest.in",
    href: "mailto:info@spirecrest.in",
    gradient: "from-cyan-600/20 to-cyan-500/10",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    sub: "Head Office, Lucknow",
    href: "https://maps.app.goo.gl/AXeJGDw9scy7koxUA",
    gradient: "from-violet-600/20 to-violet-500/10",
    border: "border-violet-500/30",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    external: true,
  },
];

/* ─── Reusable glass style ───────────────────────────────────────────── */
const glassStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderColor: "rgba(255,255,255,0.08)",
};

const inputClass =
  "bg-white/[0.04] border-white/10 text-white placeholder:text-white/25 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500/40 h-11 transition-colors duration-200";

/* ─── Component ──────────────────────────────────────────────────────── */
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
    defaultValues: { name: "", company: "", email: "", phone: "", scope: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://ssplbackend.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          business: data.company,
          email: data.email,
          phone: data.phone,
          subject: data.scope,
          message: data.message,
        }),
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

  /* ---- fade-up helper ---- */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <>
      <SEO
        title="Contact Spirecrest Solutions | Enterprise IT Partner"
        description="Reach out to Spirecrest for enterprise IT infrastructure, surveillance systems, and custom software development. Office in Lucknow, serving all of India."
        path="/contact"
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(6,182,212,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59,130,246,0.08) 0%, transparent 60%),
            #080f1e
          `,
        }}
      >
        {/* decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="section-container text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 border"
              style={{
                background: "rgba(6,182,212,0.08)",
                borderColor: "rgba(6,182,212,0.25)",
                color: "#67e8f9",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Available for Enterprise Engagements
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.06)}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-5 leading-tight"
          >
            Let&apos;s Build{" "}
            <span className="text-gradient">Something Great</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.12)}
            className="text-lg text-white/50 max-w-lg mx-auto"
          >
            Whether you&apos;re scaling infrastructure or launching a venture —
            our principals are ready to engage.
          </motion.p>
        </div>
      </section>

      {/* ── Two-column contact section ────────────────────────────────── */}
      <section
        className="py-16 md:py-20"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 10% 80%, rgba(59,130,246,0.05) 0%, transparent 60%),
            #080f1e
          `,
        }}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10 items-start">

            {/* ══ LEFT — Contact Form ═════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-2xl border p-7 sm:p-9 min-h-[600px]"
                style={glassStyle}
              >
                {/* card header */}
                <div className="mb-7">
                  <h2 className="text-2xl font-display font-bold text-white mb-1">
                    Send an Inquiry
                  </h2>
                  <p className="text-white/40 text-sm">
                    Fill out the form and we&apos;ll respond within 2 hours.
                  </p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                  >
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background: "rgba(34,197,94,0.12)" }}
                    >
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-white">
                      Message Received
                    </h3>
                    <p className="text-white/40 max-w-sm text-sm">
                      Thank you. Our team will review your inquiry and get back
                      to you within 2 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-white/15 text-white hover:bg-white/8"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-white/70 text-xs uppercase tracking-wider">
                          Full Name <span className="text-cyan-400">*</span>
                        </Label>
                        <Input
                          {...register("name")}
                          placeholder="Jane Smith"
                          className={inputClass}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-400">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-white/70 text-xs uppercase tracking-wider">
                          Company Name <span className="text-cyan-400">(optional)</span>
                        </Label>
                        <Input
                          {...register("company")}
                          placeholder="Acme Corporation"
                          className={inputClass}
                        />
                        {errors.company && (
                          <p className="text-xs text-red-400">{errors.company.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label className="text-white/70 text-xs uppercase tracking-wider">
                        Email <span className="text-cyan-400">*</span>
                      </Label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="jane@acmecorp.com"
                        className={inputClass}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone (optional) */}
                    <div className="space-y-1.5">
                      <Label className="text-white/70 text-xs uppercase tracking-wider">
                        Contact Number <span className="text-cyan-400">(optional)</span>
                      </Label>
                      <Input
                        {...register("phone")}
                        type="tel"
                        placeholder="+1 (555) 000‑0000"
                        className={inputClass}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-400">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Scope dropdown */}
                    <div className="space-y-1.5">
                      <Label className="text-white/70 text-xs uppercase tracking-wider">
                        Scope <span className="text-cyan-400">*</span>
                      </Label>
                      <div className="relative">
                        <select
                          {...register("scope")}
                          defaultValue=""
                          className={`
                            flex h-11 w-full rounded-md border px-3 py-2 text-sm
                            bg-white/[0.04] border-white/10 text-white
                            focus:outline-none focus:ring-2 focus:ring-cyan-500/40
                            focus:border-cyan-500/40 transition-colors duration-200
                            appearance-none cursor-pointer
                          `}
                          style={{ WebkitAppearance: "none" }}
                        >
                          <option value="" disabled className="bg-slate-900 text-white/40">
                            Select scope of inquiry
                          </option>
                          {scopeOptions.map((s) => (
                            <option key={s} value={s} className="bg-slate-900 text-white">
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                      </div>
                      {errors.scope && (
                        <p className="text-xs text-red-400">{errors.scope.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label className="text-white/70 text-xs uppercase tracking-wider">
                        Message <span className="text-cyan-400">(optional)</span>
                      </Label>
                      <Textarea
                        {...register("message")}
                        placeholder="Describe your project, goals, or question in detail…"
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-400">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full h-12 font-semibold text-sm transition-all duration-200 group"
                      style={{
                        background: "linear-gradient(135deg, #0891b2, #2563eb)",
                        boxShadow: "0 0 24px rgba(6,182,212,0.2)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </Button>

                    {/* Trust signals */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <span className="flex items-center gap-1.5 text-xs text-white/35">
                        <Clock className="h-3.5 w-3.5 text-cyan-500/70" />
                        Avg. response time:&nbsp;<strong className="text-white/55">&#60;&nbsp;2 hours</strong>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-white/35">
                        <Shield className="h-3.5 w-3.5 text-cyan-500/70" />
                        End-to-end encrypted
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ══ RIGHT — Bypass the Inbox ════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Bypass heading */}
              <div>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 border"
                  style={{
                    background: "rgba(6,182,212,0.08)",
                    borderColor: "rgba(6,182,212,0.2)",
                    color: "#67e8f9",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Skip the Queue
                </span>
                <h2 className="text-2xl font-display font-bold text-white mb-2">
                  Bypass the Inbox
                </h2>
                <p className="text-white/45 text-sm leading-relaxed">
                  Book a direct session with one of our Principals. No
                  gatekeepers, just focused conversation.
                </p>
              </div>

              {/* Cal.com embed */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{
                  ...glassStyle,
                  borderColor: "rgba(255,255,255,0.08)",
                  minHeight: "380px",
                }}
              >
                <iframe
                  src="https://cal.com/spirecrest/30min?embed=true&theme=dark"
                  title="Book a meeting with a Spirecrest Principal"
                  className="w-full border-0"
                  style={{ height: "420px" }}
                  loading="lazy"
                />
              </div>

              {/* Quick-action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {quickActions.map((action, i) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                    className={`
                      group flex flex-col items-center gap-2 p-4 rounded-xl border
                      bg-gradient-to-b ${action.gradient} ${action.border}
                      hover:scale-[1.03] transition-all duration-200 text-center
                    `}
                    style={{
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.iconBg} group-hover:scale-110 transition-transform duration-200`}
                    >
                      <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{action.label}</p>
                      <p className="text-white/40 text-[11px] mt-0.5 leading-tight">{action.sub}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Full-Width Map ────────────────────────────────────────────── */}
      <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <iframe
          title="Spirecrest Solutions Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.38275578886!2d80.7495!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          style={{ height: "38vh", border: 0, display: "block", filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
