import { cache } from 'react';

import { sanityFetch } from '@/sanity/lib/fetch';
import { TEAM_MEMBERS_QUERY } from '@/sanity/queries/team';
import type { TeamMember } from '@/sanity/types/team';

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  return sanityFetch<TeamMember[]>({
    query: TEAM_MEMBERS_QUERY,
    tags: ['team'],
    revalidate: 3600,
  });
});
