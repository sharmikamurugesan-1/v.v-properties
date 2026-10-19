export const COMPANY = {
  name: "V.V Properties",
  tagline: "Verified land. Thoughtfully planned.",
  phone: null as string | null, // TODO(client): real number, E.164 e.g. "+91XXXXXXXXXX"
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null, // digits only with country code
  email: null as string | null, // TODO(client)
  officeAddress: null as string | null, // TODO(client): mandatory for compliance
  instagram: "https://www.instagram.com/v.v_properties/",
  youtube: "https://www.youtube.com/@v.vproperties",
};
