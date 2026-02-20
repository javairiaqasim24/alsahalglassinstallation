import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, MapPin, Clock, Mail } from "lucide-react";
import SEO from "@/components/SEO";

const whatsappMessage = `Hello Alsahal Team,

I'm interested in your Glass & Aluminium installation services as well as your professional cleaning solutions (sofa, AC duct, curtains, etc.).

Kindly share more details and a quotation.

Thank you.`;

const WHATSAPP_URL = `https://wa.me/971559201893?text=${encodeURIComponent(whatsappMessage)}`;
const EMAIL = "alsahal268@gmail.com";

const Contact = () => (
  <>
    <SEO
      title="Contact Us | Get Free Quote | Alsahal UAE"
      description="Contact Alsahal for glass installation and cleaning services across UAE. WhatsApp, phone, email. Serving Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah. 24/7 service."
      keywords="glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal"
      canonical="/contact"
    />
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
      <div className="container text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            Get in Touch
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Ready to start your glass & aluminium project or need a cleaning quote? Reach out via WhatsApp, phone, or email.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="p-8 rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="h-12 w-12 mb-4 opacity-80" />
            <h2 className="font-heading text-2xl font-bold">Chat on WhatsApp</h2>
            <p className="mt-3 text-sm opacity-80">
              Send us a message and we'll respond within minutes.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-6 gap-2 rounded-full px-8 font-semibold hover:scale-105 transition-transform"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Start Chat
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl bg-card border border-border space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                WhatsApp / Phone
              </h3>
              <a href="https://wa.me/971559201893" className="text-muted-foreground text-sm mt-1 block hover:text-primary transition-colors">
                +971 55 920 1893
              </a>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </h3>
              <a href={`mailto:${EMAIL}`} className="text-muted-foreground text-sm mt-1 block hover:text-primary transition-colors">
                {EMAIL}
              </a>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Address
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Dubai, United Arab Emirates
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Working Hours
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                24 Hours (Sunday Off)
              </p>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          className="mt-10 rounded-2xl overflow-hidden border border-border"
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
  </>
);

export default Contact;
