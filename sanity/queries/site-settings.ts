import { defineQuery } from 'next-sanity';

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    "companyName": coalesce(title, "FieldLoop"),
    tagline,
    description,
    footerText,
    legalNote,
    email,
    phone,
    address,
    socialLinks[]{
      "icon": coalesce(icon, platform),
      "href": coalesce(href, url)
    },
    logo {
      ...,
      "alt": coalesce(alt, asset->altText)
    },
    defaultSeo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`);
