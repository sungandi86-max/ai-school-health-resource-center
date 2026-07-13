import type { ProjectCategory, ProjectStatus, ProjectToolName, ProjectType } from "@/types/project";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  PROJECT_STATUS_OPTIONS,
  PROJECT_TOOLS,
  PROJECT_TYPE_OPTIONS,
  PROJECT_TYPES,
} from "@/types/project";

export const PROJECT_SORT_OPTIONS = ["featured", "latest", "title"] as const;

export type ProjectSortOption = (typeof PROJECT_SORT_OPTIONS)[number];

export const projectTypeLabel = (type: ProjectType): string => PROJECT_TYPES[type];

export const projectStatusLabel = (status: ProjectStatus): string => PROJECT_STATUSES[status];

export const projectSortLabel = (sort: ProjectSortOption): string => {
  switch (sort) {
    case "featured":
      return "추천순";
    case "latest":
      return "최신순";
    case "title":
      return "제목순";
  }
};

export const isProjectType = (value: string): value is ProjectType =>
  PROJECT_TYPE_OPTIONS.some((type) => type === value);

export const isProjectStatus = (value: string): value is ProjectStatus =>
  PROJECT_STATUS_OPTIONS.some((status) => status === value);

export const isProjectCategory = (value: string): value is ProjectCategory =>
  PROJECT_CATEGORIES.some((category) => category === value);

export const isProjectTool = (value: string): value is ProjectToolName =>
  PROJECT_TOOLS.some((tool) => tool === value);

export const isProjectSortOption = (value: string): value is ProjectSortOption =>
  PROJECT_SORT_OPTIONS.some((sort) => sort === value);
