import { HomePage } from '@/components/site/home-page';
import { Footer } from '@/components/site/footer';
import { getSiteSettings } from '@/sanity/lib/get-site-settings';

export default async function Page() {
  const settings = await getSiteSettings();

  return (
    <>
      <HomePage settings={settings} />
      <Footer />
    </>
  );
}
