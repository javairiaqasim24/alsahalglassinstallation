import { useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";
import { loadUploadsFromStorage } from "@/utils/cloudinary";
import acDuctBefore from "@/assets/new/cleaning-services/ac-duct-before.jpeg";
import acDuctAfter from "@/assets/new/cleaning-services/ac-duct-after.jpeg";
import acGrillBefore from "@/assets/new/cleaning-services/ac-grill-before.jpeg";
import acGrillAfter from "@/assets/new/cleaning-services/ac-grill-after.jpeg";
import filterCleaningVideo from "@/assets/new/filter-cleaning.mp4";
import curtainSteamVideo from "@/assets/new/curtain-steam.mp4";
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

const HvacServices = () => {
  const title = "HVAC Services in UAE | Alsahal";
  const description =
    "HVAC services in UAE including duct installation, duct cleaning, and routine maintenance to support clean air and efficient cooling. Serving Dubai, Abu Dhabi, Sharjah and surrounding Emirates.";

  const filterVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_ac_filter_cleaning") ?? filterCleaningVideo,
    []
  );
  const acDuctVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_ac_duct_cleaning"),
    []
  );
  const curtainVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_curtain_steam") ?? curtainSteamVideo,
    []
  );

  const workMedia = useMemo(() => {
    const items: WorkMediaItem[] = [
      {
        type: "image",
        src: acDuctBefore,
        alt: "HVAC duct before cleaning service",
        label: "Duct Cleaning – Before",
      },
      {
        type: "image",
        src: acDuctAfter,
        alt: "HVAC duct after professional cleaning",
        label: "Duct Cleaning – After",
      },
      {
        type: "image",
        src: acGrillBefore,
        alt: "AC grill before HVAC maintenance",
        label: "Grill Maintenance – Before",
      },
      {
        type: "image",
        src: acGrillAfter,
        alt: "AC grill after HVAC maintenance",
        label: "Grill Maintenance – After",
      },
      {
        type: "video",
        src: filterVideoSrc,
        alt: "AC filter cleaning as part of HVAC service",
        label: "AC Filter Cleaning",
      },
      {
        type: "video",
        src: curtainVideoSrc,
        alt: "Curtain steam cleaning related HVAC indoor air service",
        label: "Curtain Steam Cleaning",
      },
    ];
    if (acDuctVideoSrc) {
      items.push({
        type: "video",
        src: acDuctVideoSrc,
        alt: "AC duct deep cleaning video",
        label: "AC Duct Deep Cleaning",
      });
    }
    return items;
  }, [filterVideoSrc, curtainVideoSrc, acDuctVideoSrc]);

  const whyItems = WHY_ALSAHAL.map((item) =>
    item.title === "10+ Years Experience"
      ? {
          ...item,
          desc: "Full HVAC support including ducts, cleaning, and property care across the UAE.",
        }
      : item
  );

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

      <ServiceHero
        title="HVAC Services"
        description="Clean air and reliable cooling come from a well-maintained HVAC system. We support homes and businesses with duct installation, cleaning, and maintenance across the UAE—from single villas to multi-zone offices."
      />

      <ServiceSection bg="background">
        <ServiceFeatureBlock
          title="Our HVAC service focus"
          items={[
            "AC duct installation for new builds and upgrades",
            "AC duct cleaning for healthier indoor air",
            "AC duct maintenance to prevent airflow issues",
            "Filter, grill, and diffuser care",
            "Airflow assessment and balancing support",
            "Post-renovation HVAC inspection and cleaning",
          ]}
        />
        <p className="text-sm text-muted-foreground text-center md:text-left -mt-4 mb-8">
          <Link className="text-primary hover:underline font-medium" to="/ac-duct-installation">
            Installation
          </Link>
          {" · "}
          <Link className="text-primary hover:underline font-medium" to="/ac-duct-cleaning">
            Cleaning
          </Link>
          {" · "}
          <Link className="text-primary hover:underline font-medium" to="/ac-duct-maintenance">
            Maintenance
          </Link>
        </p>
        <ServiceFeatureBlock
          title="Who we help"
          items={[
            "Villas and apartments",
            "Offices and retail spaces",
            "Facilities that need scheduled upkeep",
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceSectionTitle>Our Process</ServiceSectionTitle>
        <ServiceProcessSteps
          steps={[
            {
              title: "Consultation",
              desc: "Tell us your property type and concerns—we recommend installation, cleaning, or maintenance.",
            },
            {
              title: "Assessment",
              desc: "Our team inspects ducts, filters, grills, and airflow to define the right scope.",
            },
            {
              title: "Service delivery",
              desc: "Work is completed with professional equipment and minimal disruption to your space.",
            },
            {
              title: "Follow-up",
              desc: "We share results, tips, and optional maintenance schedules to keep systems efficient.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceSectionTitle>Why Choose Alsahal</ServiceSectionTitle>
        <ServiceWhyGrid items={whyItems} />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceAreas subtitle="HVAC services across the UAE:" />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceWorkGrid
          subtitle="Duct cleaning, grill maintenance, and related HVAC service clips from our UAE projects."
          media={workMedia}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceFAQ
          faqs={[
            {
              q: "What HVAC services does Alsahal provide?",
              a: "We specialise in AC duct installation, deep duct cleaning, and scheduled maintenance, plus filter and grill care to support healthy indoor air.",
            },
            {
              q: "Can you handle both homes and offices?",
              a: "Yes. We work on villas, apartments, retail units, and offices with flexible scheduling including evenings where needed.",
            },
            {
              q: "Do I need cleaning or maintenance first?",
              a: "If you notice dust, odors, or weak airflow, cleaning may be best. For routine upkeep and prevention, maintenance visits are ideal—we advise after a quick assessment.",
            },
            {
              q: "Do you work across all Emirates?",
              a: "Yes. We serve Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, and Ras Al Khaimah. Contact us to confirm availability for your area.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceCTA
          title="Need HVAC support?"
          description="Tell us your location and the issue you’re facing (airflow, odors, dust, installation), and we’ll recommend the right solution."
          price="Pricing starts from AED 200"
          primaryLink="/contact"
          primaryLabel="Get a Free Quote"
          secondaryLink="/services"
          secondaryLabel="View All Services"
        />
      </ServiceSection>
    </>
  );
};

export default HvacServices;
