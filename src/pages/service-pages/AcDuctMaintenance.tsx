import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";

const AcDuctMaintenance = () => {
  const title = "AC Duct Maintenance in UAE | Alsahal";
  const description =
    "AC duct maintenance in UAE to keep your HVAC system clean, efficient, and reliable. Scheduled inspections, filter/grill care, and airflow checks across Dubai, Abu Dhabi, and Sharjah.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical="/ac-duct-maintenance"
        structuredData={[
          generateServiceSchema("AC Duct Maintenance", description),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "AC Duct Maintenance", url: "/ac-duct-maintenance" },
          ]),
        ]}
        structuredDataId="ac-duct-maintenance"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Service
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            AC Duct Maintenance
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Prevent dust buildup, weak airflow, and unexpected breakdowns with
            routine duct maintenance. Ideal for homes, offices, and buildings that
            rely on consistent cooling.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Maintenance checklist
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Inspection of grills, vents, and visible duct sections</li>
                <li>Filter cleaning guidance and replacement support</li>
                <li>Airflow checks and problem area identification</li>
                <li>Recommendations for deep cleaning when needed</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Recommended frequency
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Homes: periodic checks during heavy summer usage</li>
                <li>Offices: scheduled maintenance for consistent air quality</li>
                <li>After renovations: inspection + targeted cleaning</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Schedule AC maintenance
            </h2>
            <p className="mt-3 text-muted-foreground">
              Message us your location and system type and we’ll share a plan and
              quote.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full px-8">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/ac-duct-cleaning">AC Duct Cleaning</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AcDuctMaintenance;

