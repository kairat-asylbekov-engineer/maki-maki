import { ScrollTopButton } from "./ScrollTopButton";
import { Contacts } from "@/components/sections/Contacts";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <>
      <Contacts />
      <footer className="container-contact flex items-center justify-between pt-10 pb-16 text-[13px] lg:pt-[37px] lg:pb-[48px] lg:pl-2">
        <span>Copyright © {site.year}</span>
        <ScrollTopButton />
      </footer>
    </>
  );
}
