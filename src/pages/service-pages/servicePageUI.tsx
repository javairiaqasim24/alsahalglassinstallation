import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Award,
  BadgeCheck,
  Clock,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_AREAS = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Al Ain",
  "Ras Al Khaimah",
];

const FEATURE_ICONS: LucideIcon[] = [
  Sparkles,
  Wind,
  ShieldCheck,
  Leaf,
  Wrench,
  Clock,
];

const AREA_PILL_CLASSNAME =
  "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-foreground shadow-soft transition-all duration-200 hover:bg-primary/20";

/** Matches Gallery / Contact / About hero exactly */
export function ServiceHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
      <div className="container text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Service
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            {title}
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function ServiceSection({
  bg = "background",
  children,
}: {
  bg?: "background" | "sage";
  children: ReactNode;
}) {
  return (
    <section
      className={`py-16 md:py-20 lg:py-28 ${bg === "sage" ? "bg-sage" : "bg-background"}`}
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function ServiceSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center md:text-left">
      {children}
    </h2>
  );
}

export function ServiceFeatureGrid({ items }: { items: string[] }) {
  return (
    <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {items.map((text, i) => {
        const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
        return (
          <div
            key={text}
            className="w-full rounded-2xl bg-card border border-border p-5 md:p-6 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-0.5"
          >
            <div className="h-11 w-11 md:h-12 md:w-12 rounded-xl bg-accent flex items-center justify-center mb-4">
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function ServiceFeatureBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="mb-10 md:mb-14 last:mb-0">
      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground text-center md:text-left">
        {title}
      </h3>
      <ServiceFeatureGrid items={items} />
    </div>
  );
}

export function ServiceProcessSteps({
  steps,
}: {
  steps: { title: string; desc: string }[];
}) {
  return (
    <div className="relative mt-8 md:mt-10">
      <div
        aria-hidden
        className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/35 to-transparent"
      />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative w-full rounded-2xl bg-card border border-border p-5 md:p-6 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1 text-center lg:text-left"
          >
            <span className="relative z-10 mx-auto lg:mx-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-soft">
              {i + 1}
            </span>
            <h3 className="font-heading font-semibold text-base md:text-lg text-foreground mt-4">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {step.desc}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export type WhyItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
  borderClass: string;
};

export const WHY_ALSAHAL: WhyItem[] = [
  {
    icon: Award,
    title: "10+ Years Experience",
    desc: "Trusted service for homes and businesses across the UAE with consistent quality.",
    borderClass: "border-t-primary",
  },
  {
    icon: MapPin,
    title: "UAE-Wide Coverage",
    desc: "We serve Dubai, Abu Dhabi, Sharjah, and all major Emirates with flexible scheduling.",
    borderClass: "border-t-accent",
  },
  {
    icon: ShieldCheck,
    title: "Licensed Professional Team",
    desc: "Trained technicians using proper equipment and industry best practices.",
    borderClass: "border-t-primary",
  },
  {
    icon: BadgeCheck,
    title: "Free Quotes",
    desc: "Clear pricing before we start—no hidden fees or surprise add-ons.",
    borderClass: "border-t-accent",
  },
];

export function ServiceWhyGrid({ items }: { items: WhyItem[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {items.map((item) => (
        <li
          key={item.title}
          className={`w-full rounded-2xl bg-card border border-border border-t-4 ${item.borderClass} p-5 md:p-6 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1`}
        >
          <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center mb-4">
            <item.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-heading font-semibold text-base md:text-lg text-foreground">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {item.desc}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function ServiceAreas({
  subtitle,
  areas = SERVICE_AREAS,
}: {
  subtitle: string;
  areas?: string[];
}) {
  return (
    <>
      <ServiceSectionTitle>Areas We Serve</ServiceSectionTitle>
      <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground text-center md:text-left">
        {subtitle}
      </p>
      <div className="mt-6 md:mt-8 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
        {areas.map((area) => (
          <span key={area} className={AREA_PILL_CLASSNAME}>
            <MapPin className="h-3.5 w-3.5 shrink-0 opacity-80" />
            {area}
          </span>
        ))}
      </div>
    </>
  );
}

export type WorkMediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  label: string;
};

export function ServiceWorkGrid({
  subtitle,
  media,
}: {
  subtitle: string;
  media: WorkMediaItem[];
}) {
  return (
    <>
      <ServiceSectionTitle>See Our Work</ServiceSectionTitle>
      <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground text-center md:text-left">
        {subtitle}
      </p>
      <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {media.map((item) => (
          <figure
            key={item.label}
            className="group w-full rounded-2xl overflow-hidden border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1"
          >
            {item.type === "video" ? (
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video object-cover"
                aria-label={item.alt}
              >
                <source src={item.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <figcaption className="p-3 md:p-4 border-t border-border">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground text-center md:text-left">
        <Link className="text-primary font-medium hover:underline" to="/gallery">
          View full gallery →
        </Link>
      </p>
    </>
  );
}

export function ServiceFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <>
      <ServiceSectionTitle>FAQ</ServiceSectionTitle>
      <Accordion type="single" collapsible className="mt-6 md:mt-8 space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq.q}
            value={`faq-${i}`}
            className="rounded-2xl border border-border bg-card px-4 md:px-6 shadow-soft border-b border-border data-[state=open]:shadow-card data-[state=open]:border-primary/30 transition-shadow"
          >
            <AccordionTrigger className="font-heading text-sm md:text-base font-semibold text-foreground text-left hover:no-underline py-4 md:py-5 [&[data-state=open]]:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 md:pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export function ServiceCTA({
  title,
  description,
  price,
  primaryLink,
  primaryLabel,
  secondaryLink,
  secondaryLabel,
}: {
  title: string;
  description: string;
  price: string;
  primaryLink: string;
  primaryLabel: string;
  secondaryLink?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground p-6 md:p-10 lg:p-12 text-center shadow-elevated">
      <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold">
        {title}
      </h2>
      <p className="mt-3 text-sm md:text-base text-primary-foreground/90 max-w-xl mx-auto leading-relaxed">
        {description}
      </p>
      <p className="mt-3 text-sm md:text-base font-semibold text-primary-foreground">
        {price}
      </p>
      <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="rounded-full px-8 font-semibold w-full sm:w-auto"
        >
          <Link to={primaryLink}>{primaryLabel}</Link>
        </Button>
        {secondaryLink && secondaryLabel && (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
          >
            <Link to={secondaryLink}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
