import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      <a
        href="tel:270-704-2207"
        className="bg-success-green text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors group"
        title="Call Now"
      >
        <Phone className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </a>
      <a
        href="sms:270-704-2207"
        className="bg-primary-blue text-white p-3 rounded-full shadow-lg hover:bg-secondary-blue transition-colors group"
        title="Send Text Message"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}
