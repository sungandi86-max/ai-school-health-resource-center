import { resourceDetailsById } from "@/data/resourceDetails";
import { resources } from "@/data/resources";
import type { Resource, WorkCategory } from "@/types/resource";

const searchableText = (resource: Resource): string =>
  [
    resource.title,
    resource.summary,
    ...resource.tags,
    ...resource.tools,
    ...resource.workCategories,
  ]
    .join(" ")
    .toLocaleLowerCase("ko-KR");

const withDetailContent = (resource: Resource): Resource => ({
  ...resource,
  ...resourceDetailsById[resource.id],
});

export const publishedResources: readonly Resource[] = resources
  .filter((resource) => resource.isPublished)
  .map(withDetailContent);

export const featuredResources: readonly Resource[] = publishedResources.filter(
  (resource) => resource.isFeatured,
);

export const getResourceBySlug = (slug: string): Resource | undefined =>
  publishedResources.find((resource) => resource.slug === slug);

export const getRelatedResources = (resource: Resource): readonly Resource[] => {
  const relatedResourceIds = resource.relatedResourceIds ?? [];

  if (relatedResourceIds.length === 0) {
    return [];
  }

  return relatedResourceIds
    .map((relatedResourceId) =>
      publishedResources.find(
        (publishedResource) =>
          publishedResource.id === relatedResourceId && publishedResource.id !== resource.id,
      ),
    )
    .filter((relatedResource): relatedResource is Resource => relatedResource !== undefined)
    .slice(0, 3);
};

export const searchResources = (query: string): readonly Resource[] => {
  const trimmedQuery = query.trim().toLocaleLowerCase("ko-KR");

  if (trimmedQuery.length === 0) {
    return featuredResources;
  }

  return publishedResources.filter((resource) => searchableText(resource).includes(trimmedQuery));
};

export const countResourcesByCategory = (category: WorkCategory): number =>
  publishedResources.filter((resource) => resource.workCategories.includes(category)).length;
