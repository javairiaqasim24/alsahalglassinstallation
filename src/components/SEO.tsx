import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  structuredDataId?: string;
  structuredDataOnly?: boolean;
}

const SEO = ({
  title = "Alsahal – Glass & Cleaning Services in UAE",
  description = "Professional glass installation, aluminium works, and cleaning services across UAE. Serving Dubai, Abu Dhabi, Sharjah. AC duct cleaning, sofa cleaning, glass partitions. Free quotes.",
  keywords = "glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal",
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonical,
  noindex = false,
  structuredData,
  structuredDataId = "page",
  structuredDataOnly = false,
}: SEOProps) => {
  const siteUrl = "https://alsahalglass.com";
  const location = useLocation();
  const fullTitle = title.includes("Alsahal") ? title : `${title} | Alsahal`;
  const canonicalPath =
    canonical ?? (location.pathname === "/" ? "/" : location.pathname.replace(/\/+$/, ""));
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  useEffect(() => {
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.content = content;
    };

    // Structured Data (JSON-LD)
    if (structuredData) {
      const id = `structured-data-${structuredDataId}`;
      let scriptTag = document.getElementById(id) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = id;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }

      const payload = Array.isArray(structuredData) ? structuredData : [structuredData];
      scriptTag.textContent = JSON.stringify(payload.length === 1 ? payload[0] : payload);
    }

    if (structuredDataOnly) return;

    // Update document title
    document.title = fullTitle;

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "Alsahal");
    updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");
    updateMetaTag("geo.region", "AE");
    updateMetaTag("geo.placename", "United Arab Emirates");

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:image", `${siteUrl}${ogImage}`, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:site_name", "Alsahal", true);
    updateMetaTag("og:locale", "en_AE", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${siteUrl}${ogImage}`);

    // Canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
  }, [
    fullTitle,
    description,
    keywords,
    ogImage,
    ogType,
    canonicalUrl,
    noindex,
    structuredData,
    structuredDataId,
    structuredDataOnly,
    siteUrl,
  ]);

  return null;
};

export default SEO;
