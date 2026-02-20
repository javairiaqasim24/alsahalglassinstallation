import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logoglass.png";

const whatsappMessage = `Hello Alsahal Team,

I'm interested in your Glass & Aluminium installation services as well as your professional cleaning solutions (sofa, AC duct, curtains, etc.).

Kindly share more details and a quotation.

Thank you.`;

const WHATSAPP_URL = `https://wa.me/971559201893?text=${encodeURIComponent(whatsappMessage)}`;

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between relative overflow-hidden">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group relative z-20 flex-shrink-0 pr-4 md:pr-6">
          <img src={logoImg} alt="Alsahal Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-contain group-hover:scale-105 transition-transform duration-300 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg leading-tight text-foreground whitespace-nowrap">
              Alsahal
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium leading-tight whitespace-nowrap">
              GLASS & ALUMINIUM | INSTALLATION & CLEANING
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center relative z-10 px-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-3.5 py-2 text-sm font-medium transition-colors group"
              >
                <span className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 rounded-lg bg-muted/0 group-hover:bg-muted/50 transition-colors duration-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 relative z-10 flex-shrink-0 pl-4">
          <Button asChild size="sm" className="gap-2 rounded-full px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Request a Quote
            </a>
          </Button>
        </div>

        {/* Mobile toggle - animated hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between items-center">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-foreground rounded-full origin-center transition-colors"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-5 h-0.5 bg-foreground rounded-full transition-colors"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-foreground rounded-full origin-center transition-colors"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <nav className="container py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.to;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-3"
              >
                <Button asChild size="default" className="w-full gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-md">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Request a Quote
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
