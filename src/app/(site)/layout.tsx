import SiteFooter from "@/app/components/Layout/site-footer";
import SiteHeader from "@/app/components/Layout/site-header";

/** The site's pages, with the header and footer. Embeds live outside this group. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
