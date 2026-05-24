import { useMemo } from "react";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";
import { loadUploadsFromStorage } from "@/utils/cloudinary";
import acGrillBefore from "@/assets/new/cleaning-services/ac-grill-before.jpeg";
import acGrillAfter from "@/assets/new/cleaning-services/ac-grill-after.jpeg";
import grillBefore from "@/assets/new/cleaning-services/before-grill.jpeg";
import grillAfter from "@/assets/new/cleaning-services/after-grill.jpeg";
import machineBefore from "@/assets/new/cleaning-services/machine-before.jpeg";
import machineAfter from "@/assets/new/cleaning-services/machine-after.jpeg";
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

const AcDuctMaintenance = () => {
  const title = "AC Duct Maintenance in UAE | Alsahal";
  const description =
    "AC duct maintenance in UAE to keep your HVAC system clean, efficient, and reliable. Scheduled inspections, filter/grill care, and airflow checks across Dubai, Abu Dhabi, and Sharjah.";

  const filterVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_ac_filter_cleaning") ?? filterCleaningVideo,
    []
  );

  const workMedia = useMemo<WorkMediaItem[]>(
    () => [
      {
        type: "image",
        src: acGrillBefore,
        alt: "AC grill before maintenance and cleaning",
        label: "AC Grill – Before Maintenance",
      },
      {
        type: "image",
        src: acGrillAfter,
        alt: "AC grill after maintenance service",
        label: "AC Grill – After Maintenance",
      },
      {
        type: "image",
        src: grillBefore,
        alt: "Vent grill before restoration",
        label: "Vent Grill – Before",
      },
      {
        type: "image",
        src: grillAfter,
        alt: "Vent grill after maintenance",
        label: "Vent Grill – After",
      },
      {
        type: "image",
        src: machineBefore,
        alt: "Cleaning equipment before maintenance",
        label: "Equipment Check – Before",
      },
      {
        type: "image",
        src: machineAfter,
        alt: "Cleaning equipment after maintenance",
        label: "Equipment Check – After",
      },
      {
        type: "video",
        src: filterVideoSrc,
        alt: "AC filter cleaning during maintenance visit",
        label: "AC Filter Cleaning",
      },
    ],
    [filterVideoSrc]
  );

  const whyItems = WHY_ALSAHAL.map((item) =>
    item.title === "10+ Years Experience"
      ? {
          ...item,
          desc: "Reliable HVAC maintenance for villas, apartments, and commercial sites across the UAE.",
        }
      : item
  );

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

      <ServiceHero
        title="AC Duct Maintenance"
        description="Prevent dust buildup, weak airflow, and unexpected breakdowns with routine duct maintenance. Ideal for homes, offices, and buildings that rely on consistent cooling throughout the UAE summer."
      />

      <ServiceSection bg="background">
        <ServiceFeatureBlock
          title="Maintenance checklist"
          items={[
            "Inspection of grills, vents, and visible duct sections",
            "Filter cleaning guidance and replacement support",
            "Airflow checks and problem area identification",
            "Recommendations for deep cleaning when needed",
            "Grill and diffuser cleaning for better air distribution",
            "Scheduled plans for offices and multi-unit buildings",
          ]}
        />
        <ServiceFeatureBlock
          title="Recommended frequency"
          items={[
            "Homes: periodic checks during heavy summer usage",
            "Offices: scheduled maintenance for consistent air quality",
            "After renovations: inspection + targeted cleaning",
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceSectionTitle>Our Process</ServiceSectionTitle>
        <ServiceProcessSteps
          steps={[
            {
              title: "System check",
              desc: "We inspect filters, grills, visible ducts, and note any dust, noise, or airflow issues.",
            },
            {
              title: "Cleaning & tuning",
              desc: "Grills and accessible components are cleaned; filters are serviced or replaced as needed.",
            },
            {
              title: "Performance review",
              desc: "Airflow and temperature balance are checked in key rooms and zones.",
            },
            {
              title: "Maintenance plan",
              desc: "You receive a simple schedule and advice on when deep duct cleaning may be required.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceSectionTitle>Why Choose Alsahal</ServiceSectionTitle>
        <ServiceWhyGrid items={whyItems} />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceAreas subtitle="AC duct maintenance across the UAE:" />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceWorkGrid
          subtitle="Grill restoration, filter care, and equipment checks from our maintenance visits."
          media={workMedia}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceFAQ
          faqs={[
            {
              q: "What is the difference between duct maintenance and duct cleaning?",
              a: "Maintenance includes regular inspections, filter and grill care, and airflow checks. Deep duct cleaning removes heavy buildup inside duct lines and is recommended when maintenance reveals significant dust or odors.",
            },
            {
              q: "How often should I schedule AC duct maintenance?",
              a: "Most homes benefit from a check every 6–12 months, especially before summer. Offices and high-use buildings often schedule quarterly visits.",
            },
            {
              q: "Do you offer maintenance contracts for offices?",
              a: "Yes. We can set recurring visits for retail, offices, and facilities with multiple AC units to keep air quality consistent year-round.",
            },
            {
              q: "Will maintenance help my AC last longer?",
              a: "Cleaner filters and ducts reduce strain on the system, which can support better performance and fewer breakdowns over time.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceCTA
          title="Schedule AC maintenance"
          description="Message us your location and system type and we’ll share a plan and quote."
          price="Pricing starts from AED 150"
          primaryLink="/contact"
          primaryLabel="Get a Free Quote"
          secondaryLink="/ac-duct-cleaning"
          secondaryLabel="AC Duct Cleaning"
        />
      </ServiceSection>
    </>
  );
};

export default AcDuctMaintenance;
