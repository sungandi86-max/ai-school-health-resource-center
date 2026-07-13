import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ResourceExplorer } from "@/components/resources/ResourceExplorer";
import { publishedResources } from "@/lib/resources";

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className="min-h-dvh bg-[var(--color-surface-subtle)] px-5 py-10 text-[var(--color-text-primary)]">
            <div className="mx-auto w-full max-w-6xl rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6">
              자료 찾기를 준비하고 있습니다.
            </div>
          </main>
        }
      >
        <ResourceExplorer resources={publishedResources} />
      </Suspense>
      <SiteFooter />
    </>
  );
}
