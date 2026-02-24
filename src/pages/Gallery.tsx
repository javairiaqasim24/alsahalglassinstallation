import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import SEO from "@/components/SEO";
import { useLocation } from "react-router-dom";

// Legacy gallery assets
import galleryGlassFacade from "@/assets/gallery-glass-facade.jpg";
import gallerySlidingDoors from "@/assets/gallery-sliding-doors.jpg";
import galleryShowerGlass from "@/assets/gallery-shower-glass.jpg";
import beforeAfterSofa from "@/assets/before-after-sofa.jpg";
import beforeAfterCarpet from "@/assets/before-after-carpet.jpg";
import beforeAfterMattress from "@/assets/before-after-mattress.jpg";
import mainShowreel from "@/assets/vid-alsahal.mp4";

// New cleaning before/after assets
import acDuctAfter from "@/assets/new/cleaning-services/ac-duct-after.jpeg";
import acDuctBefore from "@/assets/new/cleaning-services/ac-duct-before.jpeg";
import acGrillAfter from "@/assets/new/cleaning-services/ac-grill-after.jpeg";
import acGrillBefore from "@/assets/new/cleaning-services/ac-grill-before.jpeg";
import grillAfter from "@/assets/new/cleaning-services/after-grill.jpeg";
import grillBefore from "@/assets/new/cleaning-services/before-grill.jpeg";
import ductAcAfter from "@/assets/new/cleaning-services/duct-ac-after.jpeg";
import ductAcBefore from "@/assets/new/cleaning-services/duct-ac-before.jpeg";
import ductAfter from "@/assets/new/cleaning-services/duct-after.jpeg";
import ductBefore from "@/assets/new/cleaning-services/duct-before.jpeg";
import machineAfter from "@/assets/new/cleaning-services/machine-after.jpeg";
import machineBefore from "@/assets/new/cleaning-services/machine-before.jpeg";

// New glass installation assets
import glassInstall1 from "@/assets/new/glass-installation/glass-1.jpeg";
import glassInstall2 from "@/assets/new/glass-installation/glass-2.jpeg";
import glassInstall3 from "@/assets/new/glass-installation/glass-3.jpeg";
import glassInstall4 from "@/assets/new/glass-installation/glass-4.jpeg";
import glassInstall5 from "@/assets/new/glass-installation/glass-5.jpeg";
import glassInstall6 from "@/assets/new/glass-installation/glass-6.jpeg";
import glassInstall7 from "@/assets/new/glass-installation/glass-7.jpeg";
import glassInstall8 from "@/assets/new/glass-installation/glass-8.jpeg";
import glassInstall9 from "@/assets/new/glass-installation/glass-9.jpeg";
import glassInstall10 from "@/assets/new/glass-installation/glass-10.jpeg";
import glassInstall11 from "@/assets/new/glass-installation/glass-11.jpeg";
import glassInstall12 from "@/assets/new/glass-installation/glass-12.jpeg";
import glassInstall13 from "@/assets/new/glass-installation/glass-13.jpeg";
import glassInstall14 from "@/assets/new/glass-installation/glass-14.jpeg";

// New videos
import curtainSteamVideo from "@/assets/new/curtain-steam.mp4";
import filterCleaningVideo from "@/assets/new/filter-cleaning.mp4";
import mattressCleaningVideo from "@/assets/new/mattress-cleaning.mp4";

type MediaItem = {
  src: string;
  alt: string;
  label: string;
  description: string;
  type: "image" | "video";
  poster?: string;
};

type CleaningPair = {
  title: string;
  description: string;
  before: MediaItem;
  after: MediaItem;
};

const glassGallery: MediaItem[] = [
  {
    src: galleryGlassFacade,
    alt: "Completed glass curtain wall facade installation on a commercial tower in Dubai",
    label: "Curtain Wall Facade – Dubai",
    description:
      "Full-height glass curtain wall facade installed for a commercial building in Dubai using high-performance tempered glass and aluminium framing for energy-efficient daylighting.",
    type: "image",
  },
  {
    src: gallerySlidingDoors,
    alt: "Aluminium sliding door system installed for a luxury villa terrace in Dubai",
    label: "Aluminium Sliding Doors – Villa Terrace",
    description:
      "Premium aluminium sliding doors installed for a luxury villa terrace with smooth track mechanisms, secure locking and thermally broken profiles for superior insulation.",
    type: "image",
  },
  {
    src: galleryShowerGlass,
    alt: "Frameless shower glass enclosure installed in a modern bathroom",
    label: "Frameless Shower Glass – Bathroom Upgrade",
    description:
      "10mm tempered frameless shower glass enclosure with minimal hardware, upgrading a residential bathroom with a clean and modern finish.",
    type: "image",
  },
  // New glass & aluminium installation projects
  {
    src: glassInstall1,
    alt: "Technicians installing aluminium and glass windows on a residential building facade in Dubai",
    label: "Residential Window Glass Installation – Dubai",
    description:
      "Professional installation of double-glazed aluminium windows on a residential facade in Dubai, ensuring precise alignment and airtight sealing.",
    type: "image",
  },
  {
    src: glassInstall2,
    alt: "Close-up view of newly installed aluminium window profiles with clear glass panels",
    label: "Aluminium Window Profiles – Detail Finish",
    description:
      "Close-up of aluminium window profiles and clear safety glass, showcasing clean silicone joints and accurate corner finishing.",
    type: "image",
  },
  {
    src: glassInstall3,
    alt: "Team fitting large glass panels into aluminium frames during installation",
    label: "Large Panel Glass Fitting – Site Work",
    description:
      "On-site installation of large glass panels into prepared aluminium frames, completed with proper lifting tools and safety procedures.",
    type: "image",
  },
  {
    src: glassInstall4,
    alt: "New glass and aluminium balcony enclosure under installation",
    label: "Balcony Glass Enclosure – High-Rise",
    description:
      "Glass and aluminium balcony enclosure for a high-rise apartment, designed to maximise views while improving safety and weather protection.",
    type: "image",
  },
  {
    src: glassInstall5,
    alt: "Internal view of installed aluminium and glass partition system",
    label: "Office Glass Partition – Interior Fit-out",
    description:
      "Interior office fit-out using full-height glass and slim aluminium profiles to create bright, open-plan workspaces.",
    type: "image",
  },
  {
    src: glassInstall6,
    alt: "Technician sealing the edges of a newly installed glass window",
    label: "Glass Sealing & Finishing – Window Line",
    description:
      "Detailed sealing and silicone finishing on a newly installed glass window line to prevent air and water leakage.",
    type: "image",
  },
  {
    src: glassInstall7,
    alt: "Framed aluminium glass windows aligned on a residential facade",
    label: "Aligned Aluminium Windows – Residential Block",
    description:
      "Row of aligned aluminium framed windows installed on a residential block, ensuring consistent reveals and level lines.",
    type: "image",
  },
  {
    src: glassInstall8,
    alt: "Installation team working on stacking glass panels along a facade",
    label: "Stacked Glass Panels – Facade Work",
    description:
      "Installation team stacking and fixing glass panels across a building facade, following engineered shop drawings for accurate layout.",
    type: "image",
  },
  {
    src: glassInstall9,
    alt: "Completed facade showing multiple installed glass windows",
    label: "Completed Window Line – Exterior View",
    description:
      "Exterior view of a completed window line with multiple glass and aluminium units, providing a clean and modern elevation.",
    type: "image",
  },
  {
    src: glassInstall10,
    alt: "Technician fixing glass into aluminium frames using hand tools",
    label: "On-Site Glass Fixing – Aluminium Frames",
    description:
      "On-site fixing of glass into aluminium frames with appropriate spacers, gaskets and sealants to ensure long-term performance.",
    type: "image",
  },
  {
    src: glassInstall11,
    alt: "Wide shot of residential building with newly installed glass windows",
    label: "Residential Glass Upgrade – Street View",
    description:
      "Wide street view of a residential building after a full glass and aluminium window upgrade, providing improved aesthetics and efficiency.",
    type: "image",
  },
  {
    src: glassInstall12,
    alt: "Technician cleaning and inspecting newly installed glass surfaces",
    label: "Final Glass Cleaning & Inspection",
    description:
      "Final cleaning and quality inspection of newly installed glass surfaces before handover to the client.",
    type: "image",
  },
  {
    src: glassInstall13,
    alt: "Detailed view of aligned glass panels and aluminium mullions",
    label: "Glass Alignment & Mullion Detailing",
    description:
      "Detailed close-up showing the alignment of glass panels and aluminium mullions, highlighting precision engineering.",
    type: "image",
  },
  {
    src: glassInstall14,
    alt: "Glass installation team working at height on a residential facade",
    label: "Glass Installation at Height – Safety First",
    description:
      "Installation team working safely at height to complete glass and aluminium works on an upper-level residential facade.",
    type: "image",
  },
  {
    src: "https://videos.pexels.com/video-files/5765371/5765371-uhd_2560_1440_24fps.mp4",
    alt: "Glass and aluminium installation process video showing montage of works on site",
    label: "Glass & Aluminium Installation Process",
    description:
      "Behind-the-scenes video of our team installing a complete aluminium and glass system from start to finish — from preparation to final cleaning.",
    type: "video",
    poster: galleryGlassFacade,
  },
];

const cleaningPairs: CleaningPair[] = [
  {
    title: "AC Duct Deep Cleaning",
    description:
      "Professional AC duct deep cleaning service removing heavy dust, allergens and contaminants from your ductwork for cleaner indoor air.",
    before: {
      src: acDuctBefore,
      alt: "AC duct interior before professional cleaning, showing heavy dust and dirt buildup",
      label: "Before – AC Duct Deep Cleaning",
      description:
        "AC duct before cleaning with visible dust accumulation along the inner surfaces, reducing air quality and system efficiency.",
      type: "image",
    },
    after: {
      src: acDuctAfter,
      alt: "AC duct interior after deep cleaning, metal surfaces looking clean and dust-free",
      label: "After – AC Duct Deep Cleaning",
      description:
        "AC duct after deep cleaning with clear metal surfaces and significantly improved airflow and hygiene.",
      type: "image",
    },
  },
  {
    title: "AC Grill Cleaning",
    description:
      "Detailed AC grill cleaning service that removes stubborn dirt and stains without damaging paintwork or finishes.",
    before: {
      src: acGrillBefore,
      alt: "AC grill before cleaning, visibly dusty and discoloured",
      label: "Before – AC Grill Cleaning",
      description:
        "AC supply grill before cleaning with dark dust marks and blocked vents, restricting proper airflow.",
      type: "image",
    },
    after: {
      src: acGrillAfter,
      alt: "AC grill after cleaning, bright white and free of dust",
      label: "After – AC Grill Cleaning",
      description:
        "AC supply grill after detailed cleaning, restored to a bright finish and allowing fresh air to flow freely.",
      type: "image",
    },
  },
  {
    title: "Vent Grill Restoration",
    description:
      "Before and after results of vent grill restoration using eco-friendly degreasers and steam cleaning methods.",
    before: {
      src: grillBefore,
      alt: "Dirty wall vent grill before restoration, covered in dust and grime",
      label: "Before – Vent Grill Cleaning",
      description:
        "Wall vent grill before restoration, showing long-term dust buildup and yellowing around the frame.",
      type: "image",
    },
    after: {
      src: grillAfter,
      alt: "Clean wall vent grill after professional restoration service",
      label: "After – Vent Grill Cleaning",
      description:
        "Vent grill after professional cleaning with eco-friendly products, looking fresh and hygienic.",
      type: "image",
    },
  },
  {
    title: "Central Duct Cleaning",
    description:
      "Heavy-duty central duct cleaning for residential and commercial systems, targeting internal dust, mold and debris.",
    before: {
      src: ductBefore,
      alt: "Central AC duct before cleaning with deep dirt and residue inside",
      label: "Before – Central Duct Cleaning",
      description:
        "Inside view of a central AC duct before cleaning, with dark residue and accumulated dirt on the surfaces.",
      type: "image",
    },
    after: {
      src: ductAfter,
      alt: "Central AC duct after professional cleaning, interior surfaces restored to clean metal",
      label: "After – Central Duct Cleaning",
      description:
        "Central duct interior after a full mechanical and vacuum cleaning, leaving the metal bright and clean.",
      type: "image",
    },
  },
  {
    title: "AC Trunk Duct Cleaning",
    description:
      "Trunk duct cleaning to remove compacted dust from large horizontal duct runs using specialised equipment.",
    before: {
      src: ductAcBefore,
      alt: "Large AC trunk duct before cleaning with thick dust lining the base",
      label: "Before – AC Trunk Duct Cleaning",
      description:
        "AC trunk duct before cleaning, with a visible layer of dust and debris affecting air quality and system performance.",
      type: "image",
    },
    after: {
      src: ductAcAfter,
      alt: "Large AC trunk duct after cleaning, dust removed and surfaces bright",
      label: "After – AC Trunk Duct Cleaning",
      description:
        "AC trunk duct after deep cleaning, with dust and contaminants removed from the full length of the duct.",
      type: "image",
    },
  },
  {
    title: "Cleaning Machine Maintenance",
    description:
      "Before and after of internal cleaning machine components, ensuring equipment stays hygienic and efficient.",
    before: {
      src: machineBefore,
      alt: "Cleaning machine components before maintenance, showing residue and dirt",
      label: "Before – Cleaning Machine Maintenance",
      description:
        "Internal parts of a cleaning machine before maintenance, with visible residue that can affect performance.",
      type: "image",
    },
    after: {
      src: machineAfter,
      alt: "Cleaning machine components after maintenance, visibly clean and well maintained",
      label: "After – Cleaning Machine Maintenance",
      description:
        "Cleaning machine components after thorough maintenance, helping to deliver consistent deep-cleaning results.",
      type: "image",
    },
  },
];

const legacyCleaningHighlights: MediaItem[] = [
  {
    src: beforeAfterSofa,
    alt: "Before and after comparison of sofa deep cleaning, showing heavy stains removed",
    label: "Sofa Deep Cleaning",
    description:
      "Professional sofa deep cleaning using eco-friendly products and hot water extraction to remove stains, allergens and trapped dirt.",
    type: "image",
  },
  {
    src: beforeAfterCarpet,
    alt: "Before and after carpet cleaning in a living room, fibres restored and bright",
    label: "Carpet Deep Cleaning",
    description:
      "Carpet deep cleaning service rejuvenating fibres, lifting embedded dust and restoring original colour in high-traffic areas.",
    type: "image",
  },
  {
    src: beforeAfterMattress,
    alt: "Before and after mattress cleaning, surface looking brighter and sanitised",
    label: "Mattress Sanitisation",
    description:
      "UV-sanitised mattress cleaning that targets dust mites, odours and hidden bacteria for healthier sleep.",
    type: "image",
  },
];

const allItems: MediaItem[] = [
  ...glassGallery,
  ...cleaningPairs.flatMap((pair) => [pair.before, pair.after]),
  ...legacyCleaningHighlights,
  {
    src: mainShowreel,
    alt: "Alsahal Cleaning & Glass services video showreel",
    label: "Alsahal Services Showreel",
    description:
      "Showreel highlighting Al Sahal’s professional cleaning services and glass & aluminium installation projects across the UAE.",
    type: "video",
    poster: galleryGlassFacade,
  },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const id = location.hash?.replace("#", "");
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <SEO
        title="Gallery | Before & After Projects | Alsahal UAE"
        description="View our glass installation and cleaning service projects across UAE. Before & after transformations, AC duct cleaning, glass partitions, villa glass work. Dubai, Abu Dhabi, Sharjah."
        keywords="glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal"
        canonical="/gallery"
      />
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Gallery
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2">
              Our Projects & Results
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Explore our glass & aluminium installations and professional cleaning
              transformations across the UAE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Glass & Aluminium Installations */}
      <section
        id="gallery"
        className="py-20 md:py-28 bg-background"
        aria-labelledby="glass-installations-heading"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2
              id="glass-installations-heading"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3"
            >
              Glass & Aluminium Installations
            </h2>
            <p className="text-muted-foreground">
              A selection of our recent glass and aluminium projects, including
              facades, windows, partitions and balcony enclosures completed across
              the UAE.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {glassGallery.map((item, i) => (
              <motion.figure
                key={item.label + i}
                className="group rounded-2xl overflow-hidden shadow-soft hover:shadow-card bg-card flex flex-col transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  className="relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.type === "video" && item.poster ? (
                    <>
                      <img
                        src={item.poster}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated transition-transform group-hover:scale-110">
                          <Play className="h-6 w-6 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                  <div className="absolute bottom-3 left-3 bg-background/80 text-xs font-medium px-3 py-1 rounded-full text-foreground shadow-sm">
                    Glass & Aluminium
                  </div>
                </button>
                <figcaption className="p-4">
                  <h3 className="font-heading font-semibold text-sm md:text-base text-foreground">
                    {item.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
                    {item.description}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Services – Before & After */}
      <section
        className="py-20 md:py-28 bg-sage"
        aria-labelledby="cleaning-before-after-heading"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2
              id="cleaning-before-after-heading"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3"
            >
              Cleaning Services – Before &amp; After
            </h2>
            <p className="text-muted-foreground">
              Real before and after results from our AC duct, grill and deep
              cleaning services, using safe and eco-friendly cleaning methods.
            </p>
          </motion.div>

          <div className="mt-10 space-y-10">
            {cleaningPairs.map((pair, pairIndex) => (
              <motion.article
                key={pair.title}
                className="rounded-3xl bg-card/80 shadow-soft p-5 md:p-6 lg:p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pairIndex * 0.05 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[pair.before, pair.after].map((item, itemIndex) => {
                    const globalIndex =
                      glassGallery.length + pairIndex * 2 + itemIndex;

                    return (
                      <figure
                        key={item.label}
                        className="group relative overflow-hidden rounded-2xl bg-background shadow-soft hover:shadow-card transition-shadow"
                      >
                        <button
                          type="button"
                          onClick={() => setSelected(globalIndex)}
                          className="block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sage"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={item.src}
                              alt={item.alt}
                              loading="lazy"
                              decoding="async"
                              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                                {itemIndex === 0 ? "Before" : "After"}
                              </span>
                            </div>
                          </div>
                          <figcaption className="px-4 pt-3 pb-4">
                            <p className="text-xs text-muted-foreground">
                              {item.label}
                            </p>
                          </figcaption>
                        </button>
                      </figure>
                    );
                  })}
                </div>
                <div className="mt-5">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
                    {pair.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pair.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground/90">
                    All cleaning is carried out using tested, low-VOC and
                    eco-friendly methods to protect your family and HVAC system.
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Recent Projects – General Cleaning Highlights */}
      <section
        className="py-20 md:py-28 bg-background"
        aria-labelledby="recent-projects-heading"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2
              id="recent-projects-heading"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3"
            >
              Our Recent Projects
            </h2>
            <p className="text-muted-foreground">
              A snapshot of some of our most requested cleaning services, showing
              clear before and after transformations.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legacyCleaningHighlights.map((item, i) => {
              const globalIndex =
                glassGallery.length + cleaningPairs.length * 2 + i;

              return (
                <motion.figure
                  key={item.label + i}
                  className="group rounded-2xl overflow-hidden shadow-soft hover:shadow-card bg-card flex flex-col transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(globalIndex)}
                    className="relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                  </button>
                  <figcaption className="p-4">
                    <h3 className="font-heading font-semibold text-sm md:text-base text-foreground">
                      {item.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
                      {item.description}
                    </p>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Media – Videos from assets/new */}
      <section
        className="pb-24 md:pb-32 bg-background"
        aria-labelledby="additional-media-heading"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2
              id="additional-media-heading"
              className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3"
            >
              Service Videos
            </h2>
            <p className="text-muted-foreground">
              Short clips from our on-site cleaning services, demonstrating our
              process and attention to detail.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: curtainSteamVideo,
                label: "Curtain Steam Cleaning",
                description:
                  "Live demonstration of curtain steam cleaning to remove dust, odours and allergens without damaging the fabric.",
              },
              {
                src: filterCleaningVideo,
                label: "AC Filter Cleaning",
                description:
                  "Cleaning and sanitising AC filters to improve airflow and keep your indoor air fresher for longer.",
              },
              {
                src: mattressCleaningVideo,
                label: "Mattress Deep Cleaning",
                description:
                  "Mattress deep cleaning and sanitisation to remove dust mites and improve sleep quality.",
              },
            ].map((video, index) => (
              <motion.figure
                key={video.label}
                className="rounded-2xl overflow-hidden shadow-soft bg-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative bg-foreground/5">
                  <video
                    controls
                    preload="none"
                    playsInline
                    className="w-full aspect-video object-cover"
                    aria-label={video.label}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="p-4">
                  <h3 className="font-heading font-semibold text-sm md:text-base text-foreground">
                    {video.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {video.description}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Detail Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 text-primary-foreground p-2 hover:bg-primary-foreground/10 rounded-full z-10"
              onClick={() => setSelected(null)}
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              className="bg-card rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {allItems[selected].type === "video" ? (
                <video
                  autoPlay
                  controls
                  muted
                  playsInline
                  className="w-full aspect-video object-cover"
                  poster={allItems[selected].poster}
                  aria-label={allItems[selected].alt}
                >
                  <source src={allItems[selected].src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={allItems[selected].src}
                  alt={allItems[selected].alt}
                  className="w-full max-h-[55vh] object-contain bg-foreground/5"
                />
              )}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground">{allItems[selected].label}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{allItems[selected].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
