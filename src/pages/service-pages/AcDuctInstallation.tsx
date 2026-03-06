import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";

const AcDuctInstallation = () => {
  const title = "AC Duct Installation in UAE | Alsahal";
  const description =
    "AC duct installation in UAE for residential and commercial HVAC systems. Proper duct sizing, routing, insulation, and clean finishing for efficient airflow across Dubai, Abu Dhabi, and Sharjah.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical="/ac-duct-installation"
        structuredData={[
          generateServiceSchema("AC Duct Installation", description),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "AC Duct Installation", url: "/ac-duct-installation" },
          ]),
        ]}
        structuredDataId="ac-duct-installation"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Service
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            AC Duct Installation
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Efficient HVAC starts with proper duct design and installation. We
            install ducting with correct sizing, insulation, and sealing to support
            strong airflow and balanced cooling.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Our duct installation scope
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Duct routing and clean ceiling finishing</li>
                <li>Insulation and sealing to reduce leakage</li>
                <li>Grills, diffusers, and air balancing support</li>
                <li>Replacement of damaged duct sections</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Best for
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>New villas and apartments</li>
                <li>Office fit-outs and retail spaces</li>
                <li>Renovations and system upgrades</li>
                <li>Fixing weak airflow and hot spots</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Request a duct installation quote
            </h2>
            <p className="mt-3 text-muted-foreground">
              Share your property details and we’ll recommend the right duct setup.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full px-8">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/hvac-services">HVAC Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AcDuctInstallation;

