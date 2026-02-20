import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import SEO from "./SEO";
import { generateLocalBusinessSchema } from "@/utils/structuredData";

const Layout = () => (
  <>
    <SEO structuredData={generateLocalBusinessSchema()} />
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <WhatsAppFloat />
  </>
);

export default Layout;
