import { BookResourcesSection } from "@/components/home/BookResourcesSection";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HomeSearchSection } from "@/components/home/HomeSearchSection";
import { PrivacyNotice } from "@/components/home/PrivacyNotice";
import { ProjectCaseSection } from "@/components/home/ProjectCaseSection";
import { RecentUpdates } from "@/components/home/RecentUpdates";
import { WorkCategoryGrid } from "@/components/home/WorkCategoryGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-12">
          <HomeIntro />
          <HomeSearchSection />
          <WorkCategoryGrid />
          <BookResourcesSection />
          <ProjectCaseSection />
          <RecentUpdates />
          <PrivacyNotice />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
