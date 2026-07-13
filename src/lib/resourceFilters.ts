import type { Difficulty, Resource, ResourceType, WorkCategory } from "@/types/resource";
import type { SortOption } from "@/lib/resourceLabels";

export type ResourceFilterCriteria = {
  readonly query: string;
  readonly categories: readonly WorkCategory[];
  readonly types: readonly ResourceType[];
  readonly tools: readonly string[];
  readonly difficulties: readonly Difficulty[];
};

type FilterResourcesInput = {
  readonly resources: readonly Resource[];
  readonly criteria: ResourceFilterCriteria;
};

const searchableText = (resource: Resource): string =>
  [
    resource.title,
    resource.summary,
    ...resource.workCategories,
    ...resource.tools,
    ...resource.tags,
  ]
    .join(" ")
    .toLocaleLowerCase("ko-KR");

const hasGroupMatch = <Value extends string>(
  selectedValues: readonly Value[],
  resourceValues: readonly Value[],
): boolean =>
  selectedValues.length === 0 ||
  selectedValues.some((selectedValue) => resourceValues.includes(selectedValue));

export const filterResources = ({
  resources,
  criteria,
}: FilterResourcesInput): readonly Resource[] => {
  const normalizedQuery = criteria.query.trim().toLocaleLowerCase("ko-KR");

  return resources.filter((resource) => {
    const matchesQuery =
      normalizedQuery.length === 0 || searchableText(resource).includes(normalizedQuery);
    const matchesCategory = hasGroupMatch(criteria.categories, resource.workCategories);
    const matchesType =
      criteria.types.length === 0 || criteria.types.includes(resource.resourceType);
    const matchesTool = hasGroupMatch(criteria.tools, resource.tools);
    const matchesDifficulty =
      criteria.difficulties.length === 0 ||
      criteria.difficulties.includes(resource.difficulty);

    return matchesQuery && matchesCategory && matchesType && matchesTool && matchesDifficulty;
  });
};

export const sortResources = (
  resources: readonly Resource[],
  sort: SortOption,
): readonly Resource[] => {
  const indexedResources = resources.map((resource, index) => ({ resource, index }));

  if (sort === "latest") {
    return indexedResources
      .toSorted((left, right) => right.resource.updatedAt.localeCompare(left.resource.updatedAt))
      .map((item) => item.resource);
  }

  if (sort === "title") {
    return indexedResources
      .toSorted((left, right) => left.resource.title.localeCompare(right.resource.title, "ko-KR"))
      .map((item) => item.resource);
  }

  return indexedResources
    .toSorted((left, right) => {
      if (left.resource.isFeatured === right.resource.isFeatured) {
        return left.index - right.index;
      }

      return left.resource.isFeatured ? -1 : 1;
    })
    .map((item) => item.resource);
};

export const countByCategory = (
  resources: readonly Resource[],
  category: WorkCategory,
): number => resources.filter((resource) => resource.workCategories.includes(category)).length;

export const countByType = (resources: readonly Resource[], type: ResourceType): number =>
  resources.filter((resource) => resource.resourceType === type).length;

export const countByTool = (resources: readonly Resource[], tool: string): number =>
  resources.filter((resource) => resource.tools.includes(tool)).length;

export const countByDifficulty = (
  resources: readonly Resource[],
  difficulty: Difficulty,
): number => resources.filter((resource) => resource.difficulty === difficulty).length;
