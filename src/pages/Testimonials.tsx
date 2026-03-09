import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "CEO",
    business: "TechFlow Solutions",
    content: "Spirecrest Solutions transformed our digital infrastructure. Their attention to detail and innovative approach are unparalleled.",
  },
  {
    name: "Anita Sharma",
    position: "Director",
    business: "Urban Interiors",
    content: "The smart automation systems provided by SSPL have significantly improved our operational efficiency. Highly recommended!",
  },
  {
    name: "Vikram Singh",
    position: "Founder",
    business: "SolarEdge India",
    content: "Working with Spirecrest on our web development project was a breeze. They delivered a high-quality product on time.",
  },
  {
    name: "Sonal Gupta",
    position: "HR Manager",
    business: "Creative Minds",
    content: "Their cybersecurity audit was thorough and eye-opening. We feel much more secure now thanks to their expert guidance.",
  },
  {
    name: "Amit Patel",
    position: "Managing Director",
    business: "Patel Logistics",
    content: "Excellent surveillance systems. The installation was professional and the support has been outstanding.",
  },
  {
    name: "Priya Verma",
    position: "Proprietor",
    business: "Verma Studios",
    content: "The audio-visual setup for our studio is top-notch. SSPL really knows their stuff when it comes to technology.",
  },
  {
    name: "Sanjay Mehra",
    position: "IT Head",
    business: "Global Retail Corp",
    content: "SSPL provided a seamless networking solution for our multi-city offices. Truly a reliable partner for IT infrastructure.",
  },
  {
    name: "Meera Reddy",
    position: "Principal Architect",
    business: "Reddy & Associates",
    content: "Integrating smart home features into our designs became effortless with SSPL. Their execution is flawless.",
  },
  {
    name: "Arjun Das",
    position: "Operations Manager",
    business: "EcoPower Systems",
    content: "Their solar power solutions are efficient and cost-effective. We saved significantly on our energy bills.",
  },
  {
    name: "Kavita Singh",
    position: "Marketing Head",
    business: "Brand Junction",
    content: "Digital marketing services from SSPL helped us double our online presence in just six months.",
  },
  {
    name: "Rohan Joshi",
    position: "Owner",
    business: "Joshi Automotives",
    content: "Prompt service and high-quality hardware. Their computer solutions are the best in the city.",
  },
  {
    name: "Deepika Rao",
    position: "Project Manager",
    business: "Innova Soft",
    content: "The team at SSPL is highly skilled and very responsive. They handled our complex software requirements with ease.",
  },
];

export default function Testimonials() {
  return (
    <div className="pt-24 pb-24 section-container min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
          Client <span className="text-primary">Testimonials</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          What our valued clients say about their experience with Spirecrest Solutions.
        </p>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Trust from Industry Leaders
        </h2>
        <p className="text-muted-foreground">
          We pride ourselves on delivering excellence across all our service domains. Our success is measured by the satisfaction and growth of our clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            key={index}
            className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative mt-8"
          >
            <div className="absolute -top-8 left-8">
              <Avatar className="h-16 w-16 border-4 border-background shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="pt-4">
              <div className="flex gap-1 mb-4 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6 leading-relaxed">
                "{item.content}"
              </p>
              <div>
                <h4 className="font-bold text-foreground font-display">{item.name}</h4>
                <p className="text-sm text-primary font-medium">{item.position}, {item.business}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
