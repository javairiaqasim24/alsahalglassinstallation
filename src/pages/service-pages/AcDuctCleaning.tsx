import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";

const AcDuctCleaning = () => {
  const title = "AC Duct Cleaning in UAE | Alsahal";
  const description =
    "Professional AC duct cleaning in UAE to remove dust, allergens, and buildup from your HVAC system. Improve indoor air quality and airflow for villas, offices, and buildings across Dubai, Abu Dhabi, and Sharjah.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical="/ac-duct-cleaning"
        structuredData={[
          generateServiceSchema("AC Duct Cleaning", description),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "AC Duct Cleaning", url: "/ac-duct-cleaning" },
          ]),
        ]}
        structuredDataId="ac-duct-cleaning"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Service
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            AC Duct Cleaning
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Dirty ducts can circulate dust and allergens through your space. Our AC
            duct cleaning targets buildup in ductwork and vents to support cleaner
            air and better system efficiency.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Benefits
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Improves indoor air quality and reduces allergens</li>
                <li>Supports smoother airflow and HVAC performance</li>
                <li>Helps reduce odors caused by dust buildup</li>
                <li>Recommended after renovations or long gaps in cleaning</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Common signs you need duct cleaning
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Visible dust around vents or grills</li>
                <li>Musty smells when AC runs</li>
                <li>Allergy symptoms indoors</li>
                <li>Uneven cooling or weak airflow</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Get an AC duct cleaning quote
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us your location and property type and we’ll share an accurate
              quote and schedule.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-full px-8">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/ac-duct-maintenance">AC Duct Maintenance</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 text-sm text-muted-foreground">
            Related:{" "}
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

export default AcDuctCleaning;

