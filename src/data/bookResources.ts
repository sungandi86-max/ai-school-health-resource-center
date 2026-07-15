import bookResourcesJson from "@/data/bookResources.json";

export type ResourceType = "prompt" | "worksheet" | "part-project" | "full-project";

export type BookResource = {
  readonly id: string;
  readonly type: ResourceType;
  readonly title: string;
  readonly description: string;
  readonly part: number;
  readonly chapter?: number;
  readonly fileName: string;
  readonly downloadPath: string;
  readonly mimeType: string;
  readonly size: number;
};

type RawBookResource = Omit<BookResource, "type"> & {
  readonly type: string;
};

const typeOrder: Record<ResourceType, number> = {
  prompt: 0,
  worksheet: 1,
  "part-project": 2,
  "full-project": 3,
};

const parseResourceType = (type: string): ResourceType => {
  if (
    type === "prompt" ||
    type === "worksheet" ||
    type === "part-project" ||
    type === "full-project"
  ) {
    return type;
  }

  throw new Error(`Unknown book resource type: ${type}`);
};

const rawBookResources: readonly RawBookResource[] = bookResourcesJson;

export const bookDownloadResources: readonly BookResource[] = rawBookResources.map((resource) => ({
  ...resource,
  type: parseResourceType(resource.type),
}));

export const getChapterResources = (chapter: number): readonly BookResource[] =>
  bookDownloadResources
    .filter(
      (resource) =>
        resource.chapter === chapter &&
        (resource.type === "prompt" || resource.type === "worksheet"),
    )
    .sort((left, right) => typeOrder[left.type] - typeOrder[right.type]);

export const getPartProjectResource = (part: number): BookResource => {
  const resource = bookDownloadResources.find(
    (candidate) => candidate.type === "part-project" && candidate.part === part,
  );

  if (!resource) {
    throw new Error(`Missing PART ${part} project resource.`);
  }

  return resource;
};

export const fullProjectResource = (() => {
  const resource = bookDownloadResources.find((candidate) => candidate.type === "full-project");

  if (!resource) {
    throw new Error("Missing full project resource.");
  }

  return resource;
})();
