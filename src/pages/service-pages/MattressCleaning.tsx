import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";

const MattressCleaning = () => {
  const title = "Mattress Cleaning in UAE | Alsahal";
  const description =
    "Professional mattress cleaning in UAE to remove dust mites, stains, and allergens. Deep sanitization for homes, hotels, and staff accommodation across Dubai, Abu Dhabi, and Sharjah.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical="/mattress-cleaning"
        structuredData={[
          generateServiceSchema("Mattress Cleaning", description),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "Mattress Cleaning", url: "/mattress-cleaning" },
          ]),
        ]}
        structuredDataId="mattress-cleaning"
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Service
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
            Mattress Cleaning
          </h1>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            A cleaner mattress supports better sleep and healthier indoor air. We
            deep-clean, sanitize, and deodorize mattresses using safe methods for
            families and sensitive environments.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                What’s included
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Deep extraction cleaning for embedded dust and allergens</li>
                <li>Stain treatment for common spills and marks</li>
                <li>Deodorizing to remove odors and refresh fabrics</li>
                <li>Recommended for kids’ rooms, allergies, and pets</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Ideal for
              </h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li>Villas and apartments</li>
                <li>Hotels and holiday homes</li>
                <li>Staff accommodation</li>
                <li>Move-in / move-out cleaning</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Book mattress cleaning today
            </h2>
            <p className="mt-3 text-muted-foreground">
              Send your mattress size and location and we’ll share availability and
              a quote.
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
            <Link className="text-primary hover:underline" to="/ac-duct-maintenance">
              AC duct maintenance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MattressCleaning;

