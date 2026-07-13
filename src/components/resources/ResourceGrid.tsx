import type { Resource } from "@/types/resource";
import { EmptyResourceState } from "@/components/resources/EmptyResourceState";
import { ResourceCard } from "@/components/resources/ResourceCard";

type ResourceGridProps = {
  readonly resources: readonly Resource[];
  readonly onClearAll: () => void;
};

export function ResourceGrid({ resources, onClearAll }: ResourceGridProps) {
  if (resources.length === 0) {
    return <EmptyResourceState onClearAll={onClearAll} />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
