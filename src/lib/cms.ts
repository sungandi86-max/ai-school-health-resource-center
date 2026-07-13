import booksJson from "@/data/books.json";
import categoriesJson from "@/data/categories.json";
import faqJson from "@/data/faq.json";
import projectsJson from "@/data/projects.json";
import resourcesJson from "@/data/resources.json";
import updatesJson from "@/data/updates.json";
import type {
  CmsBook,
  CmsBookSummary,
  CmsCategory,
  CmsChapter,
  CmsFaq,
  CmsProject,
  CmsResource,
  CmsResourceFilters,
  CmsResourceStatus,
  CmsSortOption,
  CmsUpdate,
} from "@/types/cms";

export const cmsBooks: readonly CmsBook[] = booksJson;
export const cmsCategories: readonly CmsCategory[] = categoriesJson;
export const cmsResources: readonly CmsResource[] = resourcesJson.map((resource) => ({
  ...resource,
  status: parseCmsResourceStatus(resource.status),
  previousVersions: resource.previousVersions.map((version) => ({
    ...version,
    status: parseCmsResourceStatus(version.status),
  })),
}));
export const cmsProjects: readonly CmsProject[] = projectsJson;
export const cmsUpdates: readonly CmsUpdate[] = updatesJson;
export const cmsFaqs: readonly CmsFaq[] = faqJson;

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const defaultCmsFilters = (bookId = "all"): CmsResourceFilters => ({
  bookId,
  category: "all",
  type: "all",
  tag: "all",
  version: "all",
  query: "",
  sort: "featured",
});

export const formatCmsDate = (date: string): string => dateFormatter.format(new Date(date));

export const getBookById = (bookId: string): CmsBook | undefined =>
  cmsBooks.find((book) => book.id === bookId);

export const getCategoryById = (categoryId: string): CmsCategory | undefined =>
  cmsCategories.find((category) => category.id === categoryId);

export const getCategoryLabel = (categoryId: string): string =>
  getCategoryById(categoryId)?.label ?? categoryId;

export const isDownloadableStatus = (status: CmsResourceStatus): boolean =>
  status === "available" || status === "updated" || status === "archived";

export const getResourceStatusLabel = (status: CmsResourceStatus): string => {
  switch (status) {
    case "available":
      return "LATEST";
    case "coming-soon":
      return "준비 중";
    case "updated":
      return "UPDATED";
    case "archived":
      return "ARCHIVED";
    case "unavailable":
      return "다운로드 불가";
    default:
      return assertNever(status);
  }
};

export const getResourcesByBookId = (bookId: string): readonly CmsResource[] =>
  cmsResources.filter((resource) => resource.bookId === bookId);

export const getBookResourceSummary = (bookId: string): CmsBookSummary => {
  const resources = getResourcesByBookId(bookId);

  return {
    resourceCount: resources.length,
    downloadCount: resources.reduce((total, resource) => total + resource.downloadCount, 0),
    updatedAt: resources
      .map((resource) => resource.updatedAt)
      .toSorted((left, right) => right.localeCompare(left))[0] ?? "",
  };
};

export const getBookChapters = (bookId: string): readonly CmsChapter[] => {
  const chapterMap = new Map<number, CmsResource[]>();

  for (const resource of getResourcesByBookId(bookId)) {
    const chapterResources = chapterMap.get(resource.chapter) ?? [];
    chapterMap.set(resource.chapter, [...chapterResources, resource]);
  }

  return [...chapterMap.entries()]
    .toSorted(([left], [right]) => left - right)
    .map(([chapter, resources]) => ({
      id: `${bookId}-chapter-${chapter}`,
      chapter,
      title: `Chapter ${chapter}`,
      resources,
      pages: [`P.${chapter * 20 + 22}`],
    }));
};

export const getResourceTags = (resources: readonly CmsResource[] = cmsResources): readonly string[] =>
  [...new Set(resources.flatMap((resource) => resource.tags))].toSorted((left, right) =>
    left.localeCompare(right, "ko-KR"),
  );

export const getResourceTypes = (
  resources: readonly CmsResource[] = cmsResources,
): readonly string[] =>
  [...new Set(resources.map((resource) => resource.fileType))].toSorted((left, right) =>
    left.localeCompare(right, "ko-KR"),
  );

export const getResourceVersions = (
  resources: readonly CmsResource[] = cmsResources,
): readonly string[] =>
  [...new Set(resources.map((resource) => resource.version))].toSorted((left, right) =>
    right.localeCompare(left, "ko-KR"),
  );

export const searchCmsResources = (
  resources: readonly CmsResource[],
  query: string,
): readonly CmsResource[] => {
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

  if (normalizedQuery.length === 0) {
    return resources;
  }

  return resources.filter((resource) =>
    [
      resource.title,
      resource.description,
      resource.category,
      resource.fileType,
      ...resource.tags,
    ]
      .join(" ")
      .toLocaleLowerCase("ko-KR")
      .includes(normalizedQuery),
  );
};

export const filterCmsResources = (
  resources: readonly CmsResource[],
  filters: CmsResourceFilters,
): readonly CmsResource[] => {
  const scopedResources = resources.filter((resource) => {
    const matchesBook = filters.bookId === "all" || resource.bookId === filters.bookId;
    const matchesCategory = filters.category === "all" || resource.category === filters.category;
    const matchesType = filters.type === "all" || resource.fileType === filters.type;
    const matchesTag = filters.tag === "all" || resource.tags.includes(filters.tag);
    const matchesVersion = filters.version === "all" || resource.version === filters.version;

    return matchesBook && matchesCategory && matchesType && matchesTag && matchesVersion;
  });

  return searchCmsResources(scopedResources, filters.query);
};

export const sortCmsResources = (
  resources: readonly CmsResource[],
  sort: CmsSortOption,
): readonly CmsResource[] => {
  if (sort === "downloads") {
    return resources.toSorted((left, right) => right.downloadCount - left.downloadCount);
  }

  if (sort === "latest") {
    return resources.toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }

  if (sort === "name") {
    return resources.toSorted((left, right) => left.title.localeCompare(right.title, "ko-KR"));
  }

  return resources.toSorted((left, right) => {
    if (left.isFeatured === right.isFeatured) {
      return 0;
    }

    return left.isFeatured ? -1 : 1;
  });
};

export const getFilteredCmsResources = (
  filters: CmsResourceFilters,
): readonly CmsResource[] => sortCmsResources(filterCmsResources(cmsResources, filters), filters.sort);

function assertNever(value: never): never {
  throw new Error(`Unexpected CMS resource status: ${String(value)}`);
}

function parseCmsResourceStatus(status: string): CmsResourceStatus {
  switch (status) {
    case "available":
    case "coming-soon":
    case "updated":
    case "archived":
    case "unavailable":
      return status;
    default:
      throw new Error(`Invalid CMS resource status: ${status}`);
  }
}
