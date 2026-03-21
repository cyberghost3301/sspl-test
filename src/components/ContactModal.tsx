import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { m as motion } from "framer-motion";
import { Loader2, CheckCircle2, Shield, Clock, ChevronDown, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/* ─── Schema ─────────────────────────────────────────────────────────── */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().trim().max(200).optional(),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().optional(),
  scope: z.string().min(1, "Please select a scope"),
  message: z.string().trim().max(2000).optional(),
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

/* ─── Reusable glass style ───────────────────────────────────────────── */
const glassStyle: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderColor: "rgba(255,255,255,0.08)",
  borderRadius: "1rem",
};

const inputClass =
  "bg-white/[0.04] border-white/10 text-white placeholder:text-white/25 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500/40 h-11 transition-colors duration-200";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ isOpen, onOpenChange }: ContactModalProps) {
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
      // Changed to use the internal relative API route
      const response = await fetch("/api/contact", {
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[550px] p-0 bg-transparent border-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        aria-describedby="contact-form-description"
      >
        <DialogTitle className="sr-only">Contact Spirecrest</DialogTitle>
        <DialogDescription id="contact-form-description" className="sr-only">
          Fill out this form to send an inquiry to Spirecrest.
        </DialogDescription>

        <div
          className="relative w-full overflow-y-auto p-7 sm:p-9 border"
          style={glassStyle}
        >
          {/* Card Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-display font-bold text-white mb-1">
              Send an Inquiry
            </h2>
            <p className="text-white/50 text-sm">
              Fill out the form and we'll respond within 2 hours.
            </p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center space-y-4"
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
              <p className="text-white/50 max-w-sm text-sm">
                Thank you. Our team will review your inquiry and get back
                to you within 2 hours.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-white/15 text-white hover:bg-white/10"
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
                  <Input {...register("name")} placeholder="Jane Smith" className={inputClass} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/70 text-xs uppercase tracking-wider">
                    Company Name <span className="text-cyan-400">(optional)</span>
                  </Label>
                  <Input {...register("company")} placeholder="Acme Corp" className={inputClass} />
                  {errors.company && <p className="text-xs text-red-400">{errors.company.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs uppercase tracking-wider">
                  Email <span className="text-cyan-400">*</span>
                </Label>
                <Input {...register("email")} type="email" placeholder="jane@acme.com" className={inputClass} />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

              {/* Phone (optional) */}
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs uppercase tracking-wider">
                  Contact Number <span className="text-cyan-400">(optional)</span>
                </Label>
                <Input {...register("phone")} type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
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
                {errors.scope && <p className="text-xs text-red-400">{errors.scope.message}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs uppercase tracking-wider">
                  Message <span className="text-cyan-400">(optional)</span>
                </Label>
                <Textarea
                  {...register("message")}
                  placeholder="Describe your project, goals, or question in detail..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full h-12 font-semibold text-sm transition-all duration-200 group mt-4 hover:opacity-90 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0891b2, #2563eb)",
                  boxShadow: "0 0 24px rgba(6,182,212,0.2)",
                  color: "#fff"
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </Button>

              {/* Trust signals */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/40">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-500/70" />
                  Avg. response time:&nbsp;<strong className="text-white/60">&#60;&nbsp;2 hours</strong>
                </span>
                <span className="flex text-right items-center gap-1.5 text-[10px] sm:text-xs text-white/40">
                  <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-500/70" />
                  End-to-end encrypted
                </span>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}