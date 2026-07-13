import { projects } from "@/data/projects";
import { publishedResources } from "@/lib/resources";
import { publishedWorkflows } from "@/lib/workflows";
import type { Project, ProjectCategory, ProjectStatus, ProjectToolName, ProjectType } from "@/types/project";
import type { Resource } from "@/types/resource";
import type { WorkflowModel } from "@/types/workflow";
import type { ProjectSortOption } from "@/lib/projectLabels";

export type ProjectFilterCriteria = {
  readonly query: string;
  readonly types: readonly ProjectType[];
  readonly statuses: readonly ProjectStatus[];
  readonly tools: readonly ProjectToolName[];
  readonly categories: readonly ProjectCategory[];
};

const workflowById = new Map(publishedWorkflows.map((workflow) => [workflow.id, workflow]));
const resourceById = new Map(publishedResources.map((resource) => [resource.id, resource]));

const searchableText = (project: Project): string =>
  [
    project.title,
    project.summary,
    project.overview,
    ...project.problems,
    ...project.categories,
    ...project.tags,
    ...project.tools.map((tool) => tool.name),
    ...project.workflowIds.map((workflowId) => workflowById.get(workflowId)?.title ?? ""),
  ]
    .join(" ")
    .toLocaleLowerCase("ko-KR");

export const publishedProjects: readonly Project[] = projects.filter((project) => project.isPublished);

export const featuredProjects: readonly Project[] = publishedProjects
  .filter((project) => project.isFeatured)
  .slice(0, 3);

export const getProjectBySlug = (slug: string): Project | undefined =>
  publishedProjects.find((project) => project.slug === slug);

export const getProjectWorkflows = (project: Project): readonly WorkflowModel[] =>
  project.workflowIds
    .map((workflowId) => workflowById.get(workflowId))
    .filter((workflow): workflow is WorkflowModel => workflow !== undefined);

export const getProjectResources = (project: Project): readonly Resource[] =>
  project.resourceIds
    .map((resourceId) => resourceById.get(resourceId))
    .filter((resource): resource is Resource => resource !== undefined);

export const getRelatedProjects = (project: Project): readonly Project[] =>
  (project.relatedProjectIds ?? [])
    .map((projectId) =>
      publishedProjects.find(
        (publishedProject) => publishedProject.id === projectId && publishedProject.id !== project.id,
      ),
    )
    .filter((relatedProject): relatedProject is Project => relatedProject !== undefined)
    .slice(0, 3);

export const filterProjects = ({
  projects: sourceProjects,
  criteria,
}: {
  readonly projects: readonly Project[];
  readonly criteria: ProjectFilterCriteria;
}): readonly Project[] => {
  const query = criteria.query.trim().toLocaleLowerCase("ko-KR");

  return sourceProjects
    .filter((project) => query.length === 0 || searchableText(project).includes(query))
    .filter((project) => criteria.types.length === 0 || criteria.types.includes(project.projectType))
    .filter((project) => criteria.statuses.length === 0 || criteria.statuses.includes(project.status))
    .filter(
      (project) =>
        criteria.tools.length === 0 ||
        criteria.tools.some((tool) => project.tools.some((projectTool) => projectTool.name === tool)),
    )
    .filter(
      (project) =>
        criteria.categories.length === 0 ||
        criteria.categories.some((category) => project.categories.includes(category)),
    );
};

export const sortProjects = (
  sourceProjects: readonly Project[],
  sort: ProjectSortOption,
): readonly Project[] =>
  sourceProjects.toSorted((left, right) => {
    switch (sort) {
      case "featured":
        if (left.isFeatured !== right.isFeatured) {
          return left.isFeatured ? -1 : 1;
        }
        return right.updatedAt.localeCompare(left.updatedAt);
      case "latest":
        return right.updatedAt.localeCompare(left.updatedAt);
      case "title":
        return left.title.localeCompare(right.title, "ko-KR");
    }
  });

export const countProjectsByType = (sourceProjects: readonly Project[], type: ProjectType): number =>
  sourceProjects.filter((project) => project.projectType === type).length;

export const countProjectsByStatus = (
  sourceProjects: readonly Project[],
  status: ProjectStatus,
): number => sourceProjects.filter((project) => project.status === status).length;

export const countProjectsByTool = (
  sourceProjects: readonly Project[],
  tool: ProjectToolName,
): number => sourceProjects.filter((project) => project.tools.some((item) => item.name === tool)).length;

export const countProjectsByCategory = (
  sourceProjects: readonly Project[],
  category: ProjectCategory,
): number => sourceProjects.filter((project) => project.categories.includes(category)).length;
