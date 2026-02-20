import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object;
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
}: SEOProps) => {
  const siteUrl = "https://alsahalglass.com";
  const fullTitle = title.includes("Alsahal") ? title : `${title} | Alsahal`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

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

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, description, keywords, ogImage, ogType, canonicalUrl, noindex, structuredData]);

  return null;
};

export default SEO;
