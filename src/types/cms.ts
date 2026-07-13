export type CmsBook = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly cover: string;
  readonly description: string;
  readonly version: string;
  readonly publishedAt: string;
  readonly updatedAt: string;
  readonly qr: string;
  readonly status: string;
};

export type CmsCategory = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
};

export type CmsResourceStatus =
  | "available"
  | "coming-soon"
  | "updated"
  | "archived"
  | "unavailable";

export type CmsResourceVersion = {
  readonly version: string;
  readonly updatedAt: string;
  readonly changeNote: string;
  readonly fileType: string;
  readonly fileName: string;
  readonly filePath: string;
  readonly fileSize: string;
  readonly status: CmsResourceStatus;
};

export type CmsResource = CmsResourceVersion & {
  readonly id: string;
  readonly bookId: string;
  readonly chapter: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly isNew: boolean;
  readonly isUpdated: boolean;
  readonly isFeatured: boolean;
  readonly downloadCount: number;
  readonly previousVersions: readonly CmsResourceVersion[];
};

export type RecentDownload = {
  readonly resourceId: string;
  readonly downloadedAt: string;
};

export type CmsProject = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly thumbnail: string;
  readonly github: string;
  readonly demo: string;
  readonly status: string;
  readonly technologies: readonly string[];
};

export type CmsUpdate = {
  readonly id: string;
  readonly version: string;
  readonly date: string;
  readonly title: string;
  readonly description: string;
  readonly changes: readonly string[];
};

export type CmsFaq = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
};

export type CmsSortOption = "featured" | "latest" | "downloads" | "name";

export type CmsResourceFilters = {
  readonly bookId: string;
  readonly category: string;
  readonly type: string;
  readonly tag: string;
  readonly version: string;
  readonly query: string;
  readonly sort: CmsSortOption;
};

export type CmsChapter = {
  readonly id: string;
  readonly chapter: number;
  readonly title: string;
  readonly resources: readonly CmsResource[];
  readonly pages: readonly string[];
};

export type CmsBookSummary = {
  readonly resourceCount: number;
  readonly downloadCount: number;
  readonly updatedAt: string;
};
