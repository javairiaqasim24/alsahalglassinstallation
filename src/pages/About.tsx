import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Users, Award, Target, Heart } from "lucide-react";
import SEO from "@/components/SEO";

const values = [
  { icon: ShieldCheck, title: "Trust & Reliability", desc: "Licensed, insured, and committed to delivering consistent quality on every project." },
  { icon: Leaf, title: "Sustainable Solutions", desc: "We use energy-efficient glass systems and eco-friendly cleaning products." },
  { icon: Users, title: "Expert Professionals", desc: "Our team includes certified glass technicians and trained cleaning specialists." },
  { icon: Award, title: "Quality Guaranteed", desc: "Premium materials, precision workmanship, and warranty-backed installations." },
  { icon: Target, title: "Attention to Detail", desc: "Every joint, seal, and surface receives our meticulous attention." },
  { icon: Heart, title: "Customer First", desc: "We customize every project to fit your exact requirements and timeline." },
];

const About = () => (
  <>
    <SEO
      title="About Us | Alsahal Glass & Cleaning UAE"
      description="Learn about Alsahal - UAE's trusted glass installation and cleaning service provider. 10+ years experience serving Dubai, Abu Dhabi, Sharjah. Professional glass & aluminium works."
      keywords="glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal"
      canonical="/about"
    />
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            Your Trusted Glass & Aluminium Partner
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
            With over 12 years of experience, Alsahal specializes in premium glass and aluminium installations for residential, commercial, and industrial properties across UAE. Our primary expertise lies in custom window solutions, curtain wall systems, aluminium doors, and glass partitions — complemented by professional cleaning services for a complete property care solution. We serve Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <v.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-sage">
      <div className="container text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Mission</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
            To deliver world-class glass and aluminium solutions that combine architectural beauty with engineering precision. We aim to be the trusted partner for every property — from installation to ongoing maintenance and cleaning — using sustainable practices and a team you can truly rely on.
          </p>
        </motion.div>
      </div>
    </section>
  </>
);

export default About;
