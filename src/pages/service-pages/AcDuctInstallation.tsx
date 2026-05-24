import { useMemo } from "react";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";
import { loadUploadsFromStorage } from "@/utils/cloudinary";
import ductBefore from "@/assets/new/cleaning-services/duct-before.jpeg";
import ductAfter from "@/assets/new/cleaning-services/duct-after.jpeg";
import ductAcBefore from "@/assets/new/cleaning-services/duct-ac-before.jpeg";
import ductAcAfter from "@/assets/new/cleaning-services/duct-ac-after.jpeg";
import acGrillBefore from "@/assets/new/cleaning-services/ac-grill-before.jpeg";
import acGrillAfter from "@/assets/new/cleaning-services/ac-grill-after.jpeg";
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

const AcDuctInstallation = () => {
  const title = "AC Duct Installation in UAE | Alsahal";
  const description =
    "AC duct installation in UAE for residential and commercial HVAC systems. Proper duct sizing, routing, insulation, and clean finishing for efficient airflow across Dubai, Abu Dhabi, and Sharjah.";

  const processVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_glass_installation_process"),
    []
  );

  const workMedia = useMemo(() => {
    const items: WorkMediaItem[] = [
      {
        type: "image",
        src: ductBefore,
        alt: "Central AC duct section before installation or upgrade work",
        label: "Duct Routing – Before",
      },
      {
        type: "image",
        src: ductAfter,
        alt: "Clean central duct interior after professional installation",
        label: "Duct Routing – After",
      },
      {
        type: "image",
        src: ductAcBefore,
        alt: "AC trunk duct before installation and sealing",
        label: "Trunk Duct – Before",
      },
      {
        type: "image",
        src: ductAcAfter,
        alt: "AC trunk duct after installation with clean metal finish",
        label: "Trunk Duct – After",
      },
      {
        type: "image",
        src: acGrillBefore,
        alt: "AC supply grill before fitting and balancing",
        label: "Supply Grill – Before",
      },
      {
        type: "image",
        src: acGrillAfter,
        alt: "AC supply grill after installation and finishing",
        label: "Supply Grill – After",
      },
    ];
    if (processVideoSrc) {
      items.push({
        type: "video",
        src: processVideoSrc,
        alt: "Installation process video for HVAC and duct work",
        label: "Installation Process",
      });
    }
    return items;
  }, [processVideoSrc]);

  const whyItems = WHY_ALSAHAL.map((item) =>
    item.title === "10+ Years Experience"
      ? {
          ...item,
          desc: "Proven duct and HVAC work for residential and commercial properties in the UAE.",
        }
      : item
  );

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

      <ServiceHero
        title="AC Duct Installation"
        description="Efficient HVAC starts with proper duct design and installation. We install ducting with correct sizing, insulation, and sealing to support strong airflow and balanced cooling for new builds, renovations, and system upgrades across the UAE."
      />

      <ServiceSection bg="background">
        <ServiceFeatureBlock
          title="Our duct installation scope"
          items={[
            "Duct routing and clean ceiling finishing",
            "Insulation and sealing to reduce leakage",
            "Grills, diffusers, and air balancing support",
            "Replacement of damaged duct sections",
            "Galvanized and insulated duct for villas and offices",
            "Coordination with AC units and ceiling contractors",
          ]}
        />
        <ServiceFeatureBlock
          title="Best for"
          items={[
            "New villas and apartments",
            "Office fit-outs and retail spaces",
            "Renovations and system upgrades",
            "Fixing weak airflow and hot spots",
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceSectionTitle>Our Process</ServiceSectionTitle>
        <ServiceProcessSteps
          steps={[
            {
              title: "Site survey",
              desc: "We review floor plans, AC capacity, and ceiling space to plan duct sizes and routes.",
            },
            {
              title: "Design & quote",
              desc: "You receive a clear scope covering materials, routing, grills, and installation timeline.",
            },
            {
              title: "Installation",
              desc: "Ducts are fitted, insulated, sealed, and connected with neat finishing at grills and access points.",
            },
            {
              title: "Testing",
              desc: "Airflow and balance are checked so each room receives consistent cooling.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceSectionTitle>Why Choose Alsahal</ServiceSectionTitle>
        <ServiceWhyGrid items={whyItems} />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceAreas subtitle="AC duct installation across the UAE:" />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceWorkGrid
          subtitle="Examples of duct routing, trunk lines, and grill finishing from our installation projects."
          media={workMedia}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceFAQ
          faqs={[
            {
              q: "Do you install ducts for new villas and renovations?",
              a: "Yes. We handle new-build duct layouts, extensions, and replacement of old or damaged sections during renovations and fit-outs.",
            },
            {
              q: "What duct materials do you use?",
              a: "We typically use galvanized steel or appropriate insulated ducting based on location, noise requirements, and AC load. Materials are confirmed in your quote.",
            },
            {
              q: "Can poor duct installation cause hot rooms?",
              a: "Yes. Undersized ducts, leaks, or poor routing often cause weak airflow. Proper installation and balancing help deliver even cooling.",
            },
            {
              q: "How long does duct installation take?",
              a: "Timelines depend on property size and ceiling access. Small apartments may take 1–2 days; larger villas or offices may need longer—we provide a schedule with your quote.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceCTA
          title="Request a duct installation quote"
          description="Share your property details and we’ll recommend the right duct setup."
          price="Pricing starts from AED 800"
          primaryLink="/contact"
          primaryLabel="Get a Free Quote"
          secondaryLink="/hvac-services"
          secondaryLabel="HVAC Services"
        />
      </ServiceSection>
    </>
  );
};

export default AcDuctInstallation;
