import { useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateReviewSchema } from "@/utils/structuredData";

const GOOGLE_REVIEW_LINK = "https://g.page/r/CcsH-fuHlDp-EBI/review";

// Replace with your Elfsight widget ID after creating one at https://elfsight.com/google-reviews-widget/
const ELFSIGHT_WIDGET_ID = "4e9b06ab-0735-47e0-b5cb-ffef3b911d79";

const testimonials = [
  { name: "Ahmed Khan", text: "Excellent glass installation service from Alsahal. Very professional team and fast response. Highly recommended." },
  { name: "Sarah Ali", text: "My sofa and curtains were cleaned perfectly by Alsahal. The team was punctual and professional." },
  { name: "Mohammed Hassan", text: "Aluminium door installation was done with great quality and finishing by Alsahal. Very satisfied." },
  { name: "Fatima Noor", text: "Reliable company for both glass work and cleaning services. Will definitely use Alsahal again." },
  { name: "Omar Rashid", text: "Great AC duct cleaning service from Alsahal. The air quality improved noticeably. Excellent work!" },
  { name: "Layla Ibrahim", text: "Shower glass partition was installed perfectly by Alsahal. Clean work and reasonable pricing." },
];

const Reviews = () => {
  useEffect(() => {
    if (!ELFSIGHT_WIDGET_ID) return;
    if (!document.querySelector('script[src*="elfsight"]')) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const reviewStructuredData = generateReviewSchema(
    testimonials.map((t) => ({
      author: t.name,
      rating: 5,
      reviewBody: t.text,
      datePublished: "2026-02-12",
    }))
  );

  return (
    <>
      <SEO
        title="Customer Reviews | Alsahal Glass & Cleaning UAE"
        description="Read customer reviews and testimonials for Alsahal glass installation and cleaning services across UAE. 5-star rated. Serving Dubai, Abu Dhabi, Sharjah. Real customer feedback."
        keywords="glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal"
        canonical="/reviews"
        structuredData={reviewStructuredData}
      />
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Reviews</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
              Customer Testimonials
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Hear what our clients say about our glass, aluminium, and cleaning services.
            </p>
            <Button asChild size="lg" className="mt-8 gap-2">
              <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer">
                <Star className="h-5 w-5 fill-current" />
                Leave a Review on Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Manual Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Customer Testimonials
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              See what our clients say about our Glass, Aluminium, and Cleaning services in UAE.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                <p className="mt-4 font-heading font-semibold text-foreground text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Embed */}
      <section className="py-20 md:py-28 bg-sage">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Google Reviews
            </h2>
            <p className="mt-4 text-muted-foreground">
              Live reviews from our Google Business profile.
            </p>
          </motion.div>
          <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`} data-elfsight-app-lazy />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sage">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Happy with our service?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Your feedback helps us improve and helps others find quality glass, aluminium, and cleaning services.
          </p>
          <Button asChild size="lg" className="mt-6 gap-2">
            <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer">
              <Star className="h-5 w-5 fill-current" />
              Write a Google Review
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Reviews;
