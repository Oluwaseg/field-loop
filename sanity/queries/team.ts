import { defineQuery } from 'next-sanity';

export const TEAM_MEMBERS_QUERY = defineQuery(/* groq */ `
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    name,
    role,
    image {
      ...,
      "alt": coalesce(alt, asset->altText)
    },
    socialLinks[]{
      icon,
      href
    }
  }
`);
