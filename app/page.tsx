import { Footer } from '@/components/site/footer';
import { HomePage } from '@/components/site/home-page';
import { getSiteSettings } from '@/sanity/lib/get-site-settings';
import { getTeamMembers } from '@/sanity/lib/get-team-members';

export default async function Page() {
  const [settings, teamMembers] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <>
      <HomePage settings={settings} teamMembers={teamMembers} />
      <Footer />
    </>
  );
}
