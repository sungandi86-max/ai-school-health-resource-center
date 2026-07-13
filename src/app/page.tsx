import { PromptLibrary } from "@/components/home/PromptLibrary";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PromptLibrary />
      <SiteFooter />
    </>
  );
}
