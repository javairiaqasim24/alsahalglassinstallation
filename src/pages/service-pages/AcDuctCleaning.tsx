import { useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";
import { loadUploadsFromStorage } from "@/utils/cloudinary";
import acDuctBefore from "@/assets/new/cleaning-services/ac-duct-before.jpeg";
import acDuctAfter from "@/assets/new/cleaning-services/ac-duct-after.jpeg";
import ductAcBefore from "@/assets/new/cleaning-services/duct-ac-before.jpeg";
import ductAcAfter from "@/assets/new/cleaning-services/duct-ac-after.jpeg";
import filterCleaningVideo from "@/assets/new/filter-cleaning.mp4";
import {
  ServiceAreas,
  ServiceCTA,
  ServiceFAQ,
  ServiceFeatureBlock,
  ServiceHero,
  ServiceProcessSteps,
  ServiceSection,
  ServiceSectionTitle,
  ServiceWhyGrid,
  ServiceWorkGrid,
  WHY_ALSAHAL,
  type WorkMediaItem,
} from "./servicePageUI";

function getFirstStoredSecureUrl(tag: string): string | null {
  return loadUploadsFromStorage(tag)[0]?.secure_url ?? null;
}

const AcDuctCleaning = () => {
  const title = "AC Duct Cleaning in UAE | Alsahal";
  const description =
    "Professional AC duct cleaning in UAE to remove dust, allergens, and buildup from your HVAC system. Improve indoor air quality and airflow for villas, offices, and buildings across Dubai, Abu Dhabi, and Sharjah.";

  const filterVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_ac_filter_cleaning") ?? filterCleaningVideo,
    []
  );
  const acDuctVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_ac_duct_cleaning"),
    []
  );

  const workMedia = useMemo(() => {
    const items: WorkMediaItem[] = [
      {
        type: "image",
        src: acDuctBefore,
        alt: "AC duct interior before professional deep cleaning in UAE",
        label: "Before – AC Duct Deep Cleaning",
      },
      {
        type: "image",
        src: acDuctAfter,
        alt: "AC duct interior after deep cleaning, dust-free surfaces",
        label: "After – AC Duct Deep Cleaning",
      },
      {
        type: "image",
        src: ductAcBefore,
        alt: "AC trunk duct before cleaning with dust buildup",
        label: "Before – Trunk Duct Cleaning",
      },
      {
        type: "image",
        src: ductAcAfter,
        alt: "AC trunk duct after professional cleaning",
        label: "After – Trunk Duct Cleaning",
      },
      {
        type: "video",
        src: filterVideoSrc,
        alt: "AC filter cleaning and sanitisation service video",
        label: "AC Filter Cleaning",
      },
    ];
    if (acDuctVideoSrc) {
      items.push({
        type: "video",
        src: acDuctVideoSrc,
        alt: "AC duct deep cleaning service video in UAE",
        label: "AC Duct Deep Cleaning",
      });
    }
    return items;
  }, [filterVideoSrc, acDuctVideoSrc]);

  const whyItems = WHY_ALSAHAL.map((item) =>
    item.title === "10+ Years Experience"
      ? {
          ...item,
          desc: "Trusted duct cleaning and HVAC support for homes and businesses across the UAE.",
        }
      : item
  );

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

      <ServiceHero
        title="AC Duct Cleaning"
        description="Dirty ducts can circulate dust and allergens through your space. Our AC duct cleaning targets buildup in ductwork and vents to support cleaner air and better system efficiency across villas, apartments, and commercial buildings in the UAE."
      />

      <ServiceSection bg="background">
        <ServiceFeatureBlock
          title="Benefits"
          items={[
            "Improves indoor air quality and reduces allergens",
            "Supports smoother airflow and HVAC performance",
            "Helps reduce odors caused by dust buildup",
            "Recommended after renovations or long gaps in cleaning",
            "Professional equipment for residential and commercial ductwork",
            "Eco-friendly methods safe for families, staff, and tenants",
          ]}
        />
        <ServiceFeatureBlock
          title="Common signs you need duct cleaning"
          items={[
            "Visible dust around vents or grills",
            "Musty smells when AC runs",
            "Allergy symptoms indoors",
            "Uneven cooling or weak airflow",
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceSectionTitle>Our Process</ServiceSectionTitle>
        <ServiceProcessSteps
          steps={[
            {
              title: "Inspection",
              desc: "We assess ducts, grills, and airflow to identify dust, mold risk, and problem areas.",
            },
            {
              title: "Preparation",
              desc: "Work areas are protected and access points opened for safe, efficient cleaning.",
            },
            {
              title: "Deep cleaning",
              desc: "Duct interiors are vacuumed and treated to remove buildup, allergens, and odors.",
            },
            {
              title: "Final check",
              desc: "We verify airflow, reseal access points, and share maintenance recommendations.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceSectionTitle>Why Choose Alsahal</ServiceSectionTitle>
        <ServiceWhyGrid items={whyItems} />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceAreas subtitle="Professional AC duct cleaning available across the UAE:" />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceWorkGrid
          subtitle="Real before-and-after results and on-site AC cleaning from our UAE projects."
          media={workMedia}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceFAQ
          faqs={[
            {
              q: "How often should AC ducts be cleaned in the UAE?",
              a: "Most villas and apartments benefit from duct cleaning every 1–2 years, or sooner after renovations, heavy dust, or allergy concerns. Offices with continuous AC use may need more frequent service.",
            },
            {
              q: "How long does AC duct cleaning take?",
              a: "A typical residential job takes 2–4 hours depending on duct length, access, and buildup. We confirm timing when you request a quote.",
            },
            {
              q: "Will duct cleaning reduce AC electricity bills?",
              a: "Cleaner ducts can improve airflow, which helps your system cool more efficiently. Many clients notice fresher air and more even cooling after service.",
            },
            {
              q: "Do you clean both supply and return ducts?",
              a: "Yes. We address accessible supply and return lines, grills, and trunk sections as needed, and recommend filter cleaning or replacement where appropriate.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceCTA
          title="Get an AC duct cleaning quote"
          description="Tell us your location and property type and we’ll share an accurate quote and schedule."
          price="Pricing starts from AED 250"
          primaryLink="/contact"
          primaryLabel="Get a Free Quote"
          secondaryLink="/ac-duct-maintenance"
          secondaryLabel="AC Duct Maintenance"
        />
        <div className="mt-10 text-sm text-muted-foreground text-center">
          Related:{" "}
          <Link className="text-primary hover:underline" to="/hvac-services">
            HVAC services
          </Link>
          {" · "}
          <Link className="text-primary hover:underline" to="/mattress-cleaning">
            mattress cleaning
          </Link>
        </div>
      </ServiceSection>
    </>
  );
};

export default AcDuctCleaning;
