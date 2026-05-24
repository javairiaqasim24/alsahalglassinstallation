import { useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";
import { loadUploadsFromStorage } from "@/utils/cloudinary";
import beforeAfterMattress from "@/assets/before-after-mattress.jpg";
import mattressCleaningVideo from "@/assets/new/mattress-cleaning.mp4";
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

const MattressCleaning = () => {
  const title = "Mattress Cleaning in UAE | Alsahal";
  const description =
    "Professional mattress cleaning in UAE to remove dust mites, stains, and allergens. Deep sanitization for homes, hotels, and staff accommodation across Dubai, Abu Dhabi, and Sharjah.";

  const mattressVideoSrc = useMemo(
    () =>
      getFirstStoredSecureUrl("alsahal_video_mattress_cleaning") ?? mattressCleaningVideo,
    []
  );

  const workMedia = useMemo<WorkMediaItem[]>(
    () => [
      {
        type: "image",
        src: beforeAfterMattress,
        alt: "Before and after mattress cleaning showing brighter, sanitised surface",
        label: "Mattress Cleaning – Before & After",
      },
      {
        type: "video",
        src: mattressVideoSrc,
        alt: "Mattress deep cleaning and sanitisation service video",
        label: "Mattress Deep Cleaning",
      },
    ],
    [mattressVideoSrc]
  );

  const whyItems = WHY_ALSAHAL.map((item) =>
    item.title === "10+ Years Experience"
      ? {
          ...item,
          desc: "Trusted deep cleaning for mattresses in homes, hotels, and staff housing across the UAE.",
        }
      : item
  );

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

      <ServiceHero
        title="Mattress Cleaning"
        description="A cleaner mattress supports better sleep and healthier indoor air. We deep-clean, sanitize, and deodorize mattresses using safe methods for families, hotels, and sensitive environments across the UAE."
      />

      <ServiceSection bg="background">
        <ServiceFeatureBlock
          title="What’s included"
          items={[
            "Deep extraction cleaning for embedded dust and allergens",
            "Stain treatment for common spills and marks",
            "Deodorizing to remove odors and refresh fabrics",
            "Recommended for kids’ rooms, allergies, and pets",
            "UV sanitisation option for dust mites and bacteria",
            "Low-moisture methods so mattresses dry faster",
          ]}
        />
        <ServiceFeatureBlock
          title="Ideal for"
          items={[
            "Villas and apartments",
            "Hotels and holiday homes",
            "Staff accommodation",
            "Move-in / move-out cleaning",
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceSectionTitle>Our Process</ServiceSectionTitle>
        <ServiceProcessSteps
          steps={[
            {
              title: "Inspection",
              desc: "We check mattress size, fabric type, stains, and odors to choose the right method.",
            },
            {
              title: "Pre-treatment",
              desc: "Targeted solutions are applied to stains and high-traffic areas before deep cleaning.",
            },
            {
              title: "Deep clean",
              desc: "Hot water extraction removes dust mites, allergens, and embedded dirt from the fabric.",
            },
            {
              title: "Dry & refresh",
              desc: "We deodorize and advise drying time so your mattress is ready for use quickly.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceSectionTitle>Why Choose Alsahal</ServiceSectionTitle>
        <ServiceWhyGrid items={whyItems} />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceAreas subtitle="Mattress cleaning across the UAE:" />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceWorkGrid
          subtitle="Before-and-after results and on-site mattress deep cleaning from our UAE service teams."
          media={workMedia}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceFAQ
          faqs={[
            {
              q: "How long does a mattress take to dry after cleaning?",
              a: "Most mattresses are touch-dry within a few hours and ready for use the same day or overnight, depending on fabric and room ventilation. We advise exact timing after service.",
            },
            {
              q: "Can you remove urine, sweat, and food stains?",
              a: "Yes. We pre-treat common stains before deep extraction. Very old stains may lighten significantly but results depend on fabric and age.",
            },
            {
              q: "Is mattress cleaning safe for babies and allergy sufferers?",
              a: "We use methods designed to reduce dust mites and allergens. Let us know about sensitivities so we can recommend the best approach for your home.",
            },
            {
              q: "Do you clean mattresses in hotels and staff accommodation?",
              a: "Yes. We handle bulk bookings for hotels, holiday homes, and labour camps with flexible scheduling across the UAE.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceCTA
          title="Book mattress cleaning today"
          description="Send your mattress size and location and we’ll share availability and a quote."
          price="Pricing starts from AED 120"
          primaryLink="/contact"
          primaryLabel="Get a Free Quote"
          secondaryLink="/services"
          secondaryLabel="View All Services"
        />
        <div className="mt-10 text-sm text-muted-foreground text-center">
          Related:{" "}
          <Link className="text-primary hover:underline" to="/ac-duct-cleaning">
            AC duct cleaning
          </Link>
          {" · "}
          <Link className="text-primary hover:underline" to="/ac-duct-maintenance">
            AC duct maintenance
          </Link>
        </div>
      </ServiceSection>
    </>
  );
};

export default MattressCleaning;
