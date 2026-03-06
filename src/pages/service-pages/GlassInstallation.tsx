import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";

const GlassInstallation = () => {
  const title = "Glass Installation in UAE | Alsahal";
  const description =
    "Professional glass installation in UAE for villas, offices, and commercial buildings. Tempered & laminated safety glass, partitions, shower enclosures, and repairs across Dubai, Abu Dhabi, and Sharjah.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical="/glass-installation"
        structuredData={[
          generateServiceSchema("Glass Installation", description),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "Glass Installation", url: "/glass-installation" },
          ]),
        ]}
        structuredDataId="glass-installation"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Service
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            Glass Installation
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Safety-first glass installation for homes and businesses across the UAE.
            From partitions to facades, we deliver clean finishing and long-lasting
            performance.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                What we install
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Glass partitions for offices and shops</li>
                <li>Tempered & laminated safety glass</li>
                <li>Shower glass enclosures (frameless & sliding)</li>
                <li>Glass doors, railings, and balustrades</li>
                <li>Replacement glass and emergency repairs</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Why Alsahal
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Site measurement and clean installation</li>
                <li>Quality sealants and proper edge finishing</li>
                <li>Safe handling for large panels</li>
                <li>Fast scheduling across Dubai, Abu Dhabi & Sharjah</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Need a glass installation quote?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Share your project details and we’ll recommend the right glass type,
              thickness, and installation approach.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full px-8">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 text-sm text-muted-foreground">
            Related:{" "}
            <Link className="text-primary hover:underline" to="/ac-duct-cleaning">
              AC duct cleaning
            </Link>
            {" · "}
            <Link className="text-primary hover:underline" to="/hvac-services">
              HVAC services
            </Link>
            {" · "}
            <Link className="text-primary hover:underline" to="/mattress-cleaning">
              mattress cleaning
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GlassInstallation;

