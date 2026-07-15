import { PartResourceHub } from "@/components/home/PartResourceHub";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PartResourceHub />
      <SiteFooter />
    </>
  );
}
