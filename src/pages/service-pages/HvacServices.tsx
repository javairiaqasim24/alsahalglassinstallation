import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";

const HvacServices = () => {
  const title = "HVAC Services in UAE | Alsahal";
  const description =
    "HVAC services in UAE including duct installation, duct cleaning, and routine maintenance to support clean air and efficient cooling. Serving Dubai, Abu Dhabi, Sharjah and surrounding Emirates.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical="/hvac-services"
        structuredData={[
          generateServiceSchema("HVAC Services", description),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "HVAC Services", url: "/hvac-services" },
          ]),
        ]}
        structuredDataId="hvac-services"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Service
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            HVAC Services
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Clean air and reliable cooling come from a well-maintained HVAC system.
            We support homes and businesses with duct installation, cleaning, and
            maintenance across the UAE.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Our HVAC service focus
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>
                  <Link className="text-primary hover:underline" to="/ac-duct-installation">
                    AC duct installation
                  </Link>{" "}
                  for new builds and upgrades
                </li>
                <li>
                  <Link className="text-primary hover:underline" to="/ac-duct-cleaning">
                    AC duct cleaning
                  </Link>{" "}
                  for healthier indoor air
                </li>
                <li>
                  <Link className="text-primary hover:underline" to="/ac-duct-maintenance">
                    AC duct maintenance
                  </Link>{" "}
                  to prevent airflow issues
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Who we help
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Villas and apartments</li>
                <li>Offices and retail spaces</li>
                <li>Facilities that need scheduled upkeep</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Need HVAC support?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us your location and the issue you’re facing (airflow, odors,
              dust, installation), and we’ll recommend the right solution.
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
        </div>
      </section>
    </>
  );
};

export default HvacServices;

