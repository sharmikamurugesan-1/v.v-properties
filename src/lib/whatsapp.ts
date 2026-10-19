import { COMPANY } from "@/config/company";

export function getWhatsAppUrl(customMessage?: string): string | null {
  const phone = COMPANY.whatsapp;
  const message = customMessage ?? "Hello V.V Properties, I would like to enquire about your plotted developments.";
  const encoded = encodeURIComponent(message);
  
  if (!phone) {
    // Return direct web link with text if no number is configured yet
    return `https://wa.me/?text=${encoded}`;
  }
  
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
