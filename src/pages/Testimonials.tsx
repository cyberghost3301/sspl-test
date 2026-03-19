import { m as motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ServiceHero from "@/components/services/ServiceHero";

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
  {
    name: "Dr. Aisha Khan",
    position: "Chief Surgeon",
    business: "Metro Healthcare",
    content: "The physical security integration for our trauma center is world-class. Peace of mind redefined.",
  },
  {
    name: "Rahul Kapoor",
    position: "VP of Engineering",
    business: "Zetta Scale Systems",
    content: "Spirecrest's network architecture pass reduced our latency by 35% overnight. Absolute wizards.",
  },
  {
    name: "Elena Rossi",
    position: "Creative Director",
    business: "Milan Design Group",
    content: "Their interior-tech fusion is breathtaking. They don't just build, they architect experiences.",
  },
  {
    name: "Sandeep Toshniwal",
    position: "Managing Principal",
    business: "Toshniwal Venture Labs",
    content: "Strategic lifecycle consulting is where SSPL shines. They helped us scale from seed to Series B effortlessly.",
  },
  {
    name: "Zara Sheikh",
    position: "Lead Producer",
    business: "Echo Vibe Studios",
    content: "The acoustic treatments and boardroom integration are flawless. Best-in-class broadcast setups.",
  },
  {
    name: "Marco Vancini",
    position: "CTO",
    business: "Vancini Robotics",
    content: "IoT and automation at scale is hard. Spirecrest made it look easy with their custom firmware solutions.",
  },
  {
    name: "James Henderson",
    position: "Head of Infrastructure",
    business: "London Tech Hub (UK)",
    content: "Spirecrest's consultancy on our data center migration was flawless. They handled the complexity with surgical precision.",
  },
  {
    name: "Sarah Jenkins",
    position: "CTO",
    business: "Aura Financial (USA)",
    content: "The cybersecurity compliance audit from SSPL exceeded our expectations. Their depth of knowledge in global security standards is impressive.",
  },
  {
    name: "Hassan Al-Maktoum",
    position: "Director",
    business: "Dubai Innovation Park (UAE)",
    content: "Our integration of AI-driven surveillance across the central district was made possible by Spirecrest's robust architecture.",
  },
  {
    name: "Lin Wei",
    position: "Product Lead",
    business: "Shenzhen Dynamics (China)",
    content: "The software scalability project with SSPL doubled our user capacity without increasing overhead. True engineering partners.",
  },
  {
    name: "Sophie Dubois",
    position: "Regional Manager",
    business: "Euro-Logistics Group (France)",
    content: "Implementing IoT tracking for our cross-border fleet was a major challenge until Spirecrest stepped in. Exceptional execution.",
  },
  {
    name: "Dr. Kenji Tanaka",
    position: "Principal Scientist",
    business: "Tokyo Bio-Labs (Japan)",
    content: "Their custom firmware for our laboratory automation has streamlined our research cycles significantly. Highly innovative.",
  },
  {
    name: "Amara Okafor",
    position: "Founder",
    business: "Nexus Fintech (Nigeria)",
    content: "Spirecrest's design-first approach to our mobile banking app has helped us become a regional leader in fintech infrastructure.",
  },
  {
    name: "Thomas Mueller",
    position: "VP of Operations",
    business: "Berlin Auto-Industrie (Germany)",
    content: "The Smart City Surveillance rollout in Berlin has been a game-changer for our logistics terminals. Remarkable precision.",
  },
  {
    name: "Lucia Fernandez",
    position: "Head of Digital",
    business: "Madrid Smart Retail (Spain)",
    content: "Spirecrest's Retail Analytics transformed how we understand customer journeys in our flagship stores. Data-driven excellence.",
  },
  {
    name: "David Chang",
    position: "Director",
    business: "Singapore Green Port",
    content: "The Solar Grid deployment at the Singapore terminal is evidence of Spirecrest's world-class engineering and sustainable vision.",
  },
  {
    name: "Rachel Thorne",
    position: "CTO",
    business: "Sydney Cloud Solutions (Australia)",
    content: "Their hybrid cloud architecture pass was the missing piece in our scaling strategy. Exceptional cross-continental partnership.",
  },
  {
    name: "Ahmed Al-Fayed",
    position: "Infrastructure Lead",
    business: "Doha Media City (Qatar)",
    content: "The AV/Broadcast studio integration in Doha is a masterpiece of technical design and execution. Flawless acoustic performance.",
  },
  {
    name: "Elena Petrova",
    position: "Project Director",
    business: "Eastern Europe FinTech",
    content: "Security was our top priority. Spirecrest delivered a penetration-proof architecture that exceeded all international regulatory benchmarks.",
  },
  {
    name: "Dr. Oscar Nilsson",
    position: "Innovation lead",
    business: "Nordic Green Energy (Sweden)",
    content: "The offshore wind farm monitoring system by Spirecrest is a masterpiece of IoT engineering. Extremely robust data throughput.",
  },
  {
    name: "Zoe Tan",
    position: "Head of UX",
    business: "Pixal Studio (Hong Kong)",
    content: "SSPL's software teams understand design as well as they understand code. Their collaborative effort was refreshing and effective.",
  },
  {
    name: "Carlos Mendoza",
    position: "Director of IT",
    business: "Banco de Mexico",
    content: "Their core banking optimization project reduced our transaction latencies by 45%. Spirecrest is the gold standard for financial tech.",
  },
  {
    name: "Fatima Al-Sayed",
    position: "CEO",
    business: "Kuwait Petroleum Hub",
    content: "Digital twin implementation for our refineries was handled with total technical maturity. A professional partner in every sense.",
  },
  {
    name: "Giovanni Bianchi",
    position: "Managing Director",
    business: "Milan Fashion House (Italy)",
    content: "Smart retail analytics helped us understand our VIP movements across our global flagship stores. Insightful and reliable.",
  },
  {
    name: "Dr. Emily Watson",
    position: "Research Dean",
    business: "Cambridge Bio-Reseach (UK)",
    content: "The laboratory surveillance systems provided by Spirecrest are unparalleled in their precision and reliability for sensitive environments.",
  },
  {
    name: "Liam O'Connor",
    position: "Founder",
    business: "Dublin Tech Park (Ireland)",
    content: "Network infrastructure design for our 200-acre tech park was massive. Spirecrest made it look easy. Superior engineering.",
  },
  {
    name: "Yasmine Belkacem",
    position: "CTO",
    business: "Marrakech Smart Grid (Morocco)",
    content: "Spirecrest's solar energy management software is the heart of our regional grid. It hasn't skipped a beat in three years.",
  },
  {
    name: "Dr. Alexander Schmidt",
    position: "Operations Manager",
    business: "Frankfurt Logistics (Germany)",
    content: "Automated warehouse surveillance and sorting logic provided by SSPL have revolutionized our throughput. Efficient and safe.",
  },
  {
    name: "Isabella Silva",
    position: "Director",
    business: "Sao Paulo Urban Development (Brazil)",
    content: "AI-driven traffic management and city-wide CCTV networks from Spirecrest have improved incident response times across Sao Paulo.",
  },
  {
    name: "Samuel Kwesi",
    position: "Project Manager",
    business: "Accra Infrastructure (Ghana)",
    content: "Telecom fiber network rollout in our coastal districts was handled with extreme professionalism. Spirecrest delivers on its promises.",
  },
  {
    name: "Nidhi Agrawal",
    position: "Principal Designer",
    business: "Space & Stone Architects (India)",
    content: "Integrating premium automation into our luxury apartments was seamless with SSPL. Their hardware is discreet and powerful.",
  },
  {
    name: "Oliver Thompson",
    position: "Owner",
    business: "Thompson Media (Canada)",
    content: "The Dolby Atmos studio design and build in Vancouver exceeded all our broadcast standards. Acoustically perfect.",
  },
  {
    name: "Sofia Ivanova",
    position: "Head of Security",
    business: "Moscow City Bank (Russia)",
    content: "Layered biometric access control and 24/7 AI monitoring systems from Spirecrest have fortified our central vaulting operations.",
  },
  {
    name: "Benjamin de Boer",
    position: "CTO",
    business: "Rotterdam Shipping Logistics",
    content: "Multi-continent supply chain tracking software from SSPL has brought total transparency to our international operations.",
  },
  {
    name: "Dr. Maria Rodriguez",
    position: "Medical Superintendent",
    business: "Madrid Central Hospital (Spain)",
    content: "The digital health records system implemented by Spirecrest is intuitive, secure, and incredibly fast. Our staff loves it.",
  },
  {
    name: "Lucas van der Merwe",
    position: "Director",
    business: "Cape Town Solar Array (South Africa)",
    content: "Spirecrest's off-grid management systems for our regional solar farms have proven to be exceptionally resilient in harsh conditions.",
  },
  {
    name: "Yuki Hiroshi",
    position: "Founder",
    business: "Osaka Robotics (Japan)",
    content: "Custom hardware firmware and IoT integration for our assembly line by Spirecrest is efficient and perfectly documented.",
  },
  {
    name: "Claire Dupont",
    position: "CEO",
    business: "Lyon Smart Interiors (France)",
    content: "The fusion of technology and art in their interior automation is breathtaking. Spirecrest understands luxury better than anyone.",
  },
  {
    name: "Anders Jensen",
    position: "VP Engineering",
    business: "Copenhagen Wind Labs (Denmark)",
    content: "Complex energy grid simulations and monitoring software provided by SSPL are the best in the industry. Highly recommended.",
  },
  {
    name: "Nia Okoro",
    position: "Director",
    business: "Lagos Digital Hub (Nigeria)",
    content: "Broadband infrastructure and high-speed networking solutions from Spirecrest have empowered our start-up ecosystem.",
  },
  {
    name: "Dr. Hans Fischer",
    position: "Chief Scientist",
    business: "Vienna Bio-Institute (Austria)",
    content: "Secure data storage and high-performance computing architecture from Spirecrest have accelerated our research programs.",
  },
  {
    name: "Gabriel Garcia",
    position: "Operations Lead",
    business: "Bogota Tech Center (Colombia)",
    content: "Spirecrest's surveillance and unified command center for our industrial park is world-class. Absolute situational awareness.",
  },
  {
    name: "Lila Nguyen",
    position: "CTO",
    business: "Hanoi Softworks (Vietnam)",
    content: "The cloud scalability audit from Spirecrest was transformative. We now handle ten times the load with zero downtime.",
  },
  {
    name: "Leo Rossi",
    position: "Principal",
    business: "Rossi & Sons Architecture (Italy)",
    content: "Smart office systems and occupancy-based automation by SSPL have redefined how we think about space efficiency.",
  },
  {
    name: "Maya Patel",
    position: "Regional Head",
    business: "Global Connect Services (India)",
    content: "Telecom solutions and fiber backbone projects executed by Spirecrest have set new benchmarks for reliability in our region.",
  },
  {
    name: "Hugo Weber",
    position: "Facility Manager",
    business: "Zurich Data Vault (Switzerland)",
    content: "Physical security and AI-driven thermal imaging for our tier-3 data center provided by Spirecrest are simply unbeatable.",
  },
  {
    name: "Yara Ben-Ami",
    position: "Digital Lead",
    business: "Tel Aviv Innotech (Israel)",
    content: "Spirecrest's software development speed and technical depth for our fintech pilot were impressive. Truly an agile partner.",
  },
  {
    name: "Julian Moretti",
    position: "Director",
    business: "Sydney Smart Transit (Australia)",
    content: "Integrated surveillance and incident response software for our light rail network have significantly improved passenger safety.",
  },
  {
    name: "Jin Soo-Park",
    position: "Head of IT",
    business: "Seoul Dynamics (South Korea)",
    content: "The network infrastructure and cybersecurity pass from Spirecrest was exactly what our growing startup needed. Proactive and smart.",
  },
  {
    name: "Moussa Diop",
    position: "CEO",
    business: "Dakar Digital Services (Senegal)",
    content: "Spirecrest's strategic IT consulting shaped our national digital roadmap. Their vision is broad and their technical grasp deep.",
  },
  {
    name: "Dr. Sofia Costa",
    position: "Scientific Director",
    business: "Lisbon Marine Lab (Portugal)",
    content: "Remote ocean floor monitoring IoT sensors and data relay systems from SSPL are a breakthrough for our research team.",
  },
  {
    name: "Elias Papadopoulos",
    position: "Operations Director",
    business: "Athens Logistics Port (Greece)",
    content: "The port-wide surveillance and automated container tracking software provided by Spirecrest are essential for our operations.",
  },
  {
    name: "Ingrid Holm",
    position: "CEO",
    business: "Oslo Power & Light (Norway)",
    content: "Spirecrest's smart grid and solar management software have integrated seamlessly into our national infrastructure. Perfectly executed.",
  },
  {
    name: "Zhang Wei",
    position: "VP of Engineering",
    business: "Shanghai Micro-Systems (China)",
    content: "Custom chip design workflows and software automation by SSPL have doubled our R&D efficiency. They are true technical partners.",
  },
  {
    name: "Amelia Wright",
    position: "Director",
    business: "London Luxury Suites (UK)",
    content: "Voice-automated, invisible smart tech integration for our flagship hotel has redefined the guest experience. Pure elegance.",
  },
  {
    name: "Dr. Kenan Yilmaz",
    position: "Chief Surgeon",
    business: "Istanbul Medical Center (Turkey)",
    content: "Digital healthcare infrastructure and imaging networks from Spirecrest have significantly reduced our diagnostic turnaround times.",
  },
  {
    name: "Leila Al-Sabah",
    position: "Managing Director",
    business: "Doha International Hub (Qatar)",
    content: "Spirecrest's end-to-end IT infrastructure project for our new terminal was delivered with 100% compliance and zero delays.",
  },
];

export default function Testimonials() {
  return (
    <>
      <ServiceHero
        badge="Client Voices"
        title="Trusted by Leaders."
        highlight="Loved by Teams."
        description="Real stories from the businesses and individuals we've partnered with. Hear what makes working with Spirecrest different."
        stats={[
          { value: "12+", label: "Industries Served" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "9000+", label: "Projects Delivered" },
        ]}
      />

      <div className="py-24 section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
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
    </>
  );
}
