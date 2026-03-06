import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowRight, X } from "lucide-react";
import SEO from "@/components/SEO";
import { Link, useNavigate } from "react-router-dom";

const whatsappMessage = `Hello AlSahal Team,

I'm interested in your Glass & Aluminium installation services as well as your professional cleaning solutions (sofa, AC duct, curtains, etc.).

Kindly share more details and a quotation.

Thank you.`;

const WHATSAPP_URL = `https://wa.me/971559201893?text=${encodeURIComponent(whatsappMessage)}`;

const services = [
  // Glass & Aluminium — Primary
  {
    title: "Glass Window Installation",
    desc: "Custom glass windows for residential and commercial buildings. Single, double, and triple glazing options.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    details: "Our glass window installations use premium tempered and laminated glass with thermally broken aluminium frames. We offer single, double, and triple glazing for optimal insulation, noise reduction, and energy efficiency. Every project is tailored to your building's specifications with precision measurements and professional fitting.",
    category: "Glass & Aluminium",
  },
  {
    title: "Aluminium Doors & Frames",
    desc: "Sliding, folding, hinged, and pivot doors with premium aluminium profiles.",
    image:"https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: "We design and install a wide range of aluminium door systems including sliding, bi-fold, French, and pivot doors. Our profiles are powder-coated for durability and available in multiple finishes. Each system is engineered for smooth operation, security, and weather resistance.",
    category: "Glass & Aluminium",
  },
  {
    title: "Curtain Wall Systems",
    desc: "Modern glass and aluminium curtain wall facades for commercial and high-rise buildings.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    details: "Our curtain wall systems combine structural aluminium framing with high-performance glass panels. They offer excellent thermal insulation, weather sealing, and aesthetic appeal. Ideal for office towers, retail fronts, and modern commercial developments that demand a striking facade.",
    category: "Glass & Aluminium",
  },
  {
    title: "Glass Partitions & Railings",
    desc: "Interior glass partitions, balustrades, and staircase railings for modern spaces.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop",
    details: "Transform your interiors with frameless or framed glass partitions that maximize natural light while defining spaces. Our glass railings and balustrades add a modern touch to balconies, staircases, and mezzanines — all installed to strict safety standards.",
    category: "Glass & Aluminium",
  },
  {
    title: "Shower Glass Enclosures",
    desc: "Custom frameless and semi-frameless shower enclosures in tempered safety glass.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    details: "We fabricate and install bespoke shower enclosures using 8mm–12mm tempered safety glass. Choose from frameless, semi-frameless, or sliding designs with high-quality stainless steel or chrome hardware. Anti-limescale coatings available for easy maintenance.",
    category: "Glass & Aluminium",
  },
  {
    title: "Glass & Aluminium Maintenance",
    desc: "Comprehensive repair, sealing, and maintenance services for all glass and aluminium installations.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    details: "Keep your glass and aluminium installations in top condition with our maintenance services. We handle seal replacement, hardware repair, glass replacement, re-glazing, and corrosion treatment. Regular maintenance extends lifespan and ensures safety compliance.",
    category: "Glass & Aluminium",
  },
  // Cleaning — Secondary
  {
    title: "Sofa & Upholstery Cleaning",
    desc: "Professional deep cleaning for fabric and leather sofas, chairs, and upholstery.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    details: "Our sofa cleaning uses hot water extraction with eco-friendly solutions to remove stains, odors, bacteria, and allergens from deep within upholstery fibers. Regular professional cleaning extends furniture lifespan and keeps your living space fresh and healthy.",
    category: "Cleaning",
  },
  {
    title: "Carpet & Mattress Cleaning",
    desc: "Steam cleaning, stain removal, and UV sanitization for carpets and mattresses.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    details: "Carpets and mattresses trap allergens, dust mites, and bacteria. Our professional cleaning removes up to 98% of allergens using hot water extraction and UV sanitization, improving indoor air quality and creating a healthier environment for your family.",
    category: "Cleaning",
  },
  {
    title: "AC Duct & Curtain Cleaning",
    desc: "Remove dust, mold, and allergens from AC ducts. On-site and off-site curtain cleaning.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop",
    details: "Dirty AC ducts circulate pollutants every time your system runs. Our duct cleaning improves air quality and reduces energy costs. We also offer gentle curtain cleaning that removes embedded dirt while preserving fabric quality and color.",
    category: "Cleaning",
  },
];

const Services = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const glassServices = services.filter(s => s.category === "Glass & Aluminium");
  const cleanServices = services.filter(s => s.category === "Cleaning");

  const renderCards = (items: typeof services, offset: number) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((s, i) => {
        const idx = offset + i;
        return (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              role="link"
              tabIndex={0}
              aria-label={`Open gallery for: ${s.title}`}
              onClick={() => navigate("/gallery#gallery")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("/gallery#gallery");
                }
              }}
              className="group overflow-hidden h-full flex flex-col border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-1">
                <h3 className="font-heading font-semibold text-lg text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>

                <AnimatePresence>
                  {expandedId === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground leading-relaxed">
                        {s.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  variant="link"
                  className="p-0 h-auto gap-1 text-primary mt-4 self-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(expandedId === idx ? null : idx);
                  }}
                >
                  {expandedId === idx ? (
                    <>Close <X className="h-4 w-4" /></>
                  ) : (
                    <>Read More <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <>
      <SEO
        title="Glass & Cleaning Services UAE | Alsahal"
        description="Complete glass installation, aluminium works, and cleaning services across UAE. Glass partitions, shower glass, office cleaning, villa cleaning, AC duct cleaning. Dubai, Abu Dhabi, Sharjah."
        keywords="glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal"
        canonical="/services"
      />
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
              Glass, Aluminium & Cleaning Solutions
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              From premium glass & aluminium installations to professional cleaning — AlSahal delivers comprehensive property solutions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full">
                <Link to="/glass-installation">Glass Installation</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/ac-duct-cleaning">AC Duct Cleaning</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/ac-duct-installation">AC Duct Installation</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/ac-duct-maintenance">AC Duct Maintenance</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/hvac-services">HVAC Services</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/mattress-cleaning">Mattress Cleaning</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Glass & Aluminium */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Glass & Aluminium Services
            </h2>
            <p className="mt-2 text-muted-foreground">Our core expertise — installation, fabrication, and maintenance.</p>
          </motion.div>
          {renderCards(glassServices, 0)}
        </div>
      </section>

      {/* Cleaning */}
      <section className="py-20 md:py-28 bg-sage">
        <div className="container">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Cleaning Services
            </h2>
            <p className="mt-2 text-muted-foreground">Professional cleaning solutions for homes and commercial spaces.</p>
          </motion.div>
          {renderCards(cleanServices, glassServices.length)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            className="text-center p-10 rounded-2xl bg-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-2xl font-bold text-primary-foreground">
              Need a Custom Solution?
            </h3>
            <p className="mt-3 text-primary-foreground/80">
              Contact us for personalized quotes tailored to your project requirements.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-6 gap-2 rounded-full px-8 font-semibold"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Get a Free Quote
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
