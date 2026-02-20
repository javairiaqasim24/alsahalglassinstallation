import { MessageCircle } from "lucide-react";

const phoneNumber = "971559201893";
const message = `Hello Alsahal Team,

I'm interested in your Glass & Aluminium installation services as well as your professional cleaning solutions (sofa, AC duct, curtains, etc.).

Kindly share more details and a quotation.

Thank you.`;

const WHATSAPP_URL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message
)}`;


const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[hsl(142,70%,45%)] text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);

export default WhatsAppFloat;
