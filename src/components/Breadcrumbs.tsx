import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema } from "@/utils/structuredData";
import SEO from "./SEO";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    ...pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
      return { name, url: to };
    }),
  ];

  const structuredData = generateBreadcrumbSchema(breadcrumbItems);

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumbs on homepage
  }

  return (
    <>
      <SEO structuredData={structuredData} />
      <nav aria-label="Breadcrumb" className="container py-4 pt-24 md:pt-28">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    to={item.url}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                    aria-label="Home"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="h-4 w-4" />
                    {isLast ? (
                      <span className="text-foreground font-medium" aria-current="page">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        to={item.url}
                        className="hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
            )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
