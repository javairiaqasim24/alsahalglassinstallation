import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle, Mail, Clock } from "lucide-react";

const whatsappMessage ="Hello AlSahal Team,\n\nI'm interested in your Glass & Aluminium installation services as well as your professional cleaning solutions (sofa, AC duct, curtains, etc.).\n\nKindly share more details and a quotation.\n\nThank you.";

const WHATSAPP_URL = `https://wa.me/971559201893?text=${encodeURIComponent(whatsappMessage)}`;

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">A</span>
            </div>
            <span className="font-heading font-bold text-xl">Alsahal</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Professional glass installation, aluminium works, and cleaning services across UAE. Serving Dubai, Abu Dhabi, Sharjah, and all Emirates.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {["Home", "About", "Services", "Gallery", "Reviews", "Blog", "Contact"].map(
              (label) => (
                <Link
                  key={label}
                  to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <a href="tel:+971559201893" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <Phone className="h-4 w-4" />
              +971559201893
            </a>
            <a href="mailto:alsahal268@gmail.com" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <Mail className="h-4 w-4" />
              alsahal268@gmail.com
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-100 transition-opacity"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Working Hours</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              24 Hours (Sunday Off)
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              Dubai, United Arab Emirates
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Alsahal. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
