import { useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/utils/structuredData";
import { loadUploadsFromStorage } from "@/utils/cloudinary";
import galleryGlassFacade from "@/assets/gallery-glass-facade.jpg";
import gallerySlidingDoors from "@/assets/gallery-sliding-doors.jpg";
import galleryShowerGlass from "@/assets/gallery-shower-glass.jpg";
import glassInstall1 from "@/assets/new/glass-installation/glass-1.jpeg";
import glassInstall2 from "@/assets/new/glass-installation/glass-2.jpeg";
import glassInstall3 from "@/assets/new/glass-installation/glass-3.jpeg";
import glassInstall4 from "@/assets/new/glass-installation/glass-4.jpeg";
import glassInstall5 from "@/assets/new/glass-installation/glass-5.jpeg";
import glassInstall6 from "@/assets/new/glass-installation/glass-6.jpeg";
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

const GlassInstallation = () => {
  const title = "Glass Installation in UAE | Alsahal";
  const description =
    "Professional glass installation in UAE for villas, offices, and commercial buildings. Tempered & laminated safety glass, partitions, shower enclosures, and repairs across Dubai, Abu Dhabi, and Sharjah.";

  const processVideoSrc = useMemo(
    () => getFirstStoredSecureUrl("alsahal_video_glass_installation_process"),
    []
  );

  const workMedia = useMemo(() => {
    const items: WorkMediaItem[] = [
      {
        type: "image",
        src: galleryGlassFacade,
        alt: "Glass curtain wall facade installation in Dubai",
        label: "Curtain Wall Facade",
      },
      {
        type: "image",
        src: gallerySlidingDoors,
        alt: "Aluminium sliding door and glass installation",
        label: "Aluminium Sliding Doors",
      },
      {
        type: "image",
        src: galleryShowerGlass,
        alt: "Frameless shower glass enclosure installation",
        label: "Shower Glass Enclosure",
      },
      {
        type: "image",
        src: glassInstall1,
        alt: "Residential glass window installation Dubai",
        label: "Window Installation",
      },
      {
        type: "image",
        src: glassInstall2,
        alt: "Aluminium window profiles with glass panels",
        label: "Aluminium Window Profiles",
      },
      {
        type: "image",
        src: glassInstall3,
        alt: "Technicians fitting large glass panels",
        label: "Large Panel Fitting",
      },
      {
        type: "image",
        src: glassInstall4,
        alt: "Glass balcony enclosure installation",
        label: "Balcony Glass Enclosure",
      },
      {
        type: "image",
        src: glassInstall5,
        alt: "Office glass partition interior fit-out",
        label: "Office Glass Partition",
      },
      {
        type: "image",
        src: glassInstall6,
        alt: "Glass sealing and finishing on window line",
        label: "Sealing & Finishing",
      },
    ];
    if (processVideoSrc) {
      items.push({
        type: "video",
        src: processVideoSrc,
        alt: "Glass and aluminium installation process video",
        label: "Installation Process",
      });
    }
    return items;
  }, [processVideoSrc]);

  const whyItems = WHY_ALSAHAL.map((item) =>
    item.title === "10+ Years Experience"
      ? {
          ...item,
          desc: "Hundreds of glass and aluminium projects completed for villas, offices, and retail in the UAE.",
        }
      : item
  );

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical="/glass-installation"
        structuredData={[
          generateServiceSchema("Glass Installation", description),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: "Glass Installation", url: "/glass-installation" },
          ]),
        ]}
        structuredDataId="glass-installation"
      />

      <ServiceHero
        title="Glass Installation"
        description="Safety-first glass installation for homes and businesses across the UAE. From partitions to facades, we deliver clean finishing and long-lasting performance with tempered, laminated, and custom-cut glass solutions."
      />

      <ServiceSection bg="background">
        <ServiceFeatureBlock
          title="What we install"
          items={[
            "Glass partitions for offices and shops",
            "Tempered & laminated safety glass",
            "Shower glass enclosures (frameless & sliding)",
            "Glass doors, railings, and balustrades",
            "Replacement glass and emergency repairs",
            "Curtain walls and commercial facades",
          ]}
        />
        <ServiceFeatureBlock
          title="Why Alsahal"
          items={[
            "Site measurement and clean installation",
            "Quality sealants and proper edge finishing",
            "Safe handling for large panels",
            "Fast scheduling across Dubai, Abu Dhabi & Sharjah",
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceSectionTitle>Our Process</ServiceSectionTitle>
        <ServiceProcessSteps
          steps={[
            {
              title: "Site visit",
              desc: "We measure openings, review design requirements, and recommend glass type and thickness.",
            },
            {
              title: "Quote & planning",
              desc: "You receive a detailed quote covering materials, hardware, timeline, and safety measures.",
            },
            {
              title: "Fabrication & install",
              desc: "Glass is cut to size and installed with precise alignment, sealing, and hardware fitting.",
            },
            {
              title: "Quality handover",
              desc: "Final inspection, cleaning, and care instructions so your installation stays pristine.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceSectionTitle>Why Choose Alsahal</ServiceSectionTitle>
        <ServiceWhyGrid items={whyItems} />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceAreas subtitle="Glass installation across the UAE:" />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceWorkGrid
          subtitle="Recent glass facades, partitions, shower enclosures, and on-site installation from our UAE portfolio."
          media={workMedia}
        />
      </ServiceSection>

      <ServiceSection bg="sage">
        <ServiceFAQ
          faqs={[
            {
              q: "What types of glass do you install in the UAE?",
              a: "We install tempered and laminated safety glass for partitions, doors, showers, balustrades, windows, and commercial facades. The right type depends on location, size, and building requirements.",
            },
            {
              q: "How long does glass installation take?",
              a: "Small jobs such as shower enclosures may take one day. Larger office partitions or facades can take several days—we confirm timeline after site measurement.",
            },
            {
              q: "Do you offer emergency glass replacement?",
              a: "Yes. Contact us with photos and dimensions for broken panels—we prioritise safe removal and replacement where possible.",
            },
            {
              q: "Is site measurement included?",
              a: "Yes. Accurate measurement is included in our process so glass fits correctly the first time and sealants perform as expected.",
            },
          ]}
        />
      </ServiceSection>

      <ServiceSection bg="background">
        <ServiceCTA
          title="Need a glass installation quote?"
          description="Share your project details and we’ll recommend the right glass type, thickness, and installation approach."
          price="Pricing starts from AED 500"
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

export default GlassInstallation;
