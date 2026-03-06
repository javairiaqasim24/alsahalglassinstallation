import { useEffect } from "react";
import { Link } from "react-router-dom";
import myVideo from "../assets/vid-alsahal.mp4";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { generateOrganizationSchema } from "@/utils/structuredData";
import {
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Leaf,
  Clock,
  Users,
  Star,
  ArrowRight,
  Sofa,
  Bed,
  Layers,
  Building2,
  SprayCan,
  GlassWater,
  DoorOpen,
  PanelTop,
  Wrench,
  Award,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Play,
} from "lucide-react";
import heroImg from "@/assets/hero-glass-aluminium.jpg";
import gallerySlidingDoors from "@/assets/gallery-sliding-doors.jpg";

const phoneNumber = "971559201893";
const message = `Hello Alsahal Team,

I'm interested in your Glass & Aluminium installation services as well as your professional cleaning solutions (sofa, AC duct, curtains, etc.).

Kindly share more details and a quotation.

Thank you.`;

const WHATSAPP_URL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message
)}`;
const EMAIL = "alsahal268@gmail.com";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const primaryServices = [
  { icon: GlassWater, title: "Glass Installation", desc: "Custom glass solutions for windows, facades, and partitions." },
  { icon: DoorOpen, title: "Aluminium Doors", desc: "Premium aluminium door systems — sliding, folding, and hinged." },
  { icon: PanelTop, title: "Curtain Walls", desc: "Modern curtain wall systems for commercial buildings." },
  { icon: Wrench, title: "Maintenance & Repair", desc: "Expert repair and maintenance for all glass & aluminium work." },
];

const cleaningServices = [
  { icon: Sofa, title: "Sofa Cleaning", desc: "Deep cleaning & stain removal for upholstery." },
  { icon: Layers, title: "Carpet Cleaning", desc: "Professional steam cleaning for carpets and rugs." },
  { icon: Bed, title: "Mattress Cleaning", desc: "Sanitization for a healthy sleep environment." },
  { icon: SprayCan, title: "AC Duct Cleaning", desc: "Remove dust and allergens from AC systems." },
];

const whyUs = [
  { icon: ShieldCheck, title: "Trusted & Certified", desc: "Licensed professionals with years of industry experience." },
  { icon: Leaf, title: "Eco-Friendly Solutions", desc: "Sustainable materials and safe cleaning products." },
  { icon: Clock, title: "On-Time Delivery", desc: "Punctual project completion, every single time." },
  { icon: Award, title: "Quality Guaranteed", desc: "Premium materials and workmanship backed by warranty." },
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "1200+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Professional Staff" },
];

const testimonials = [
  { name: "Mohammed A.", text: "Alsahal transformed our office with stunning glass partitions. Professional team and flawless execution!", rating: 5 },
  { name: "Sarah K.", text: "Best aluminium window installation we've had. The quality and finish are outstanding.", rating: 5 },
  { name: "Javairia Q.", text: "We use Alsahal for both our glass work and office cleaning. Reliable, affordable, and top-quality.", rating: 5 },
];

const Index = () => {
  useEffect(() => {
    if (!document.querySelector('script[src*="elfsight"]')) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <SEO
        title="Alsahal – Glass & Cleaning Services UAE"
        description="Professional glass installation, aluminium works, and cleaning services across UAE. Serving Dubai, Abu Dhabi, Sharjah. AC duct cleaning, sofa cleaning, glass partitions. Free quotes."
        keywords="glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal"
        canonical="/"
        structuredData={generateOrganizationSchema()}
      />
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Professional glass and aluminium installation by Alsahal" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/20" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.span variants={fadeUp} custom={0} className="inline-block text-sm font-semibold text-primary-foreground/70 uppercase tracking-wider mb-3">
              Glass & Aluminium Experts
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight"
            >
              Premium Glass & Aluminium Solutions You Can Trust
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 text-lg text-primary-foreground/80 max-w-lg leading-relaxed"
            >
              Expert installation, maintenance, and repair of glass windows, aluminium doors, curtain walls, and more — plus professional cleaning services.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2 rounded-full px-8 text-base shadow-elevated hover:scale-105 transition-transform">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Request a Quote
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Working Hours Bar */}
      <section className="py-5 bg-primary/10 border-b border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-sm">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-2 text-foreground font-medium">
              <Clock className="h-4 w-4 text-primary" />
              <span>Working Hours: <strong>24 Hours</strong> (Sunday Off)</span>
            </motion.div>
            <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              <span>+971 55 920 1893</span>
            </motion.a>
            <motion.a href={`mailto:${EMAIL}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4 text-primary" />
              <span>Mail us on: {EMAIL}</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-14 bg-primary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">{s.value}</p>
                <p className="text-sm text-primary-foreground/70 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Services — Glass & Aluminium */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Core Services</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Glass & Aluminium Solutions
            </h2>
            <p className="mt-4 text-muted-foreground">
              From modern curtain walls to precision aluminium door systems, we deliver expert installation and maintenance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {primaryServices.map((s, i) => (
              <Link
                key={s.title}
                to="/services"
                aria-label={`View services: ${s.title}`}
                className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <motion.div
                  className="group p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <s.icon className="h-6 w-6 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full px-8 hover:scale-105 transition-transform">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-20 md:py-28 bg-foreground">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary-foreground/60 uppercase tracking-wider">See Us in Action</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mt-2">
              Our Work in Motion
            </h2>
            <p className="mt-4 text-primary-foreground/70">
              Watch our team deliver precision glass & aluminium installations across Dubai.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-elevated relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <video
              src={myVideo}
              className="w-full aspect-video"
              controls
              playsInline
              preload="metadata"
            />

            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Cleaning Services — Secondary */}
      <section className="py-20 md:py-28 bg-sage">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Also Available</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Professional Cleaning Services
            </h2>
            <p className="mt-4 text-muted-foreground">
              In addition to our glass & aluminium expertise, we offer comprehensive cleaning solutions for homes and offices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cleaningServices.map((s, i) => (
              <motion.div
                key={s.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-6 w-6 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Alsahal</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                className="text-center p-6 rounded-2xl hover:bg-card hover:shadow-soft transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Preview */}
      <section className="py-20 md:py-28 bg-sage">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Work</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Projects
            </h2>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-card group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
          >
            <img src={gallerySlidingDoors} alt="Aluminium sliding door installation project by Alsahal" className="w-full group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-full px-8 hover:scale-105 transition-transform">
              <Link to="/gallery">
                View Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Reviews — Elfsight Google Reviews */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Customer Reviews
            </h2>
            <p className="mt-4 text-muted-foreground">
              See what our clients say about our Glass, Aluminium, and Cleaning services in UAE.
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="elfsight-app-4e9b06ab-0735-47e0-b5cb-ffef3b911d79" data-elfsight-app-lazy />
          </motion.div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-20 md:py-28 bg-sage">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Find Us</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Our Dubai Office
            </h2>
          </motion.div>
          <motion.div
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-card border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              title="Alsahal UAE Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.68279939405!2d54.947286!3d25.076022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-10 w-10 text-primary-foreground/60 mx-auto mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
              Get in touch today for a free consultation. From glass installations to deep cleaning — we've got you covered.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2 rounded-full px-10 text-base font-semibold hover:scale-105 transition-transform"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
