/**
 * Isolated Studio layout — no site chrome, navbar, or footer.
 * Sanity Studio handles its own authentication in production.
 */
export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
