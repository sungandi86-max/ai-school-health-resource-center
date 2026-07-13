"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FeaturedResources } from "@/components/home/FeaturedResources";
import { SearchPanel } from "@/components/home/SearchPanel";
import { featuredResources } from "@/lib/resources";

export function HomeSearchSection() {
  const router = useRouter();
  const [draftQuery, setDraftQuery] = useState("");

  const resources = useMemo(() => featuredResources.slice(0, 6), []);

  const openResourceSearch = (query: string) => {
    const trimmedQuery = query.trim();
    const nextUrl =
      trimmedQuery.length > 0
        ? `/resources?q=${encodeURIComponent(trimmedQuery)}`
        : "/resources";

    router.push(nextUrl);
  };

  return (
    <div className="grid gap-8">
      <SearchPanel
        draftQuery={draftQuery}
        resultCount={resources.length}
        onDraftQueryChange={setDraftQuery}
        onSearch={openResourceSearch}
      />
      <FeaturedResources resources={resources} query="" />
    </div>
  );
}
