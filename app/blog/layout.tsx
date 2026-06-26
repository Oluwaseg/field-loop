import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { getSiteSettings } from '@/sanity/lib/get-site-settings';

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <div className='min-h-screen bg-background'>
      <Navbar companyName={settings.companyName} logoUrl={settings.logoUrl} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
