import { Contacts } from "@/components/sections/Contacts";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <>
      <Contacts />
      <footer className="container-contact pt-10 pb-16 text-[13px] lg:pt-[37px] lg:pb-[48px] lg:pl-2">
        Copyright © {site.year}
      </footer>
    </>
  );
}
