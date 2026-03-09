import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-24 pb-16 section-container min-h-screen">
      <div className="mb-12 md:mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Start the <span className="text-primary">Conversation</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
          Whether you're looking for a complete digital transformation or an advanced surveillance setup, our team is ready to deliver.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-4 order-2 lg:order-1 space-y-8">
          <div className="bg-muted/30 p-8 rounded-2xl border">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Registered Address</h4>
                  <a href="https://maps.app.goo.gl/AXeJGDw9scy7koxUA" target="_blank" rel="noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    537/121, A/B, Sector-K,<br />
                    Aliganj, Lucknow,<br />
                    Uttar Pradesh, India, 226024
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Head Office</h4>
                  <p className="text-muted-foreground text-sm">
                    41/68, Kali Niwas, Narhi,<br />
                    Hazratganj, Lucknow,<br />
                    Uttar Pradesh, India, 226001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <a href="tel:+919250974145" className="text-muted-foreground hover:text-primary transition-colors">+91 9250974145</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <div className="text-muted-foreground flex flex-col gap-1 text-sm">
                    <a href="mailto:info@spirecrest.in" className="hover:text-primary">info@spirecrest.in</a>
                    <a href="mailto:sales@spirecrest.in" className="hover:text-primary">sales@spirecrest.in</a>
                    <a href="mailto:people@spirecrest.in" className="hover:text-primary">people@spirecrest.in</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Business Hours</h4>
                  <p className="text-muted-foreground">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 order-1 lg:order-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
