import { workflows } from "@/data/workflows";
import { publishedResources } from "@/lib/resources";
import type { Resource } from "@/types/resource";
import type { WorkflowCategory, WorkflowModel } from "@/types/workflow";

const searchableText = (workflow: WorkflowModel): string =>
  [
    workflow.title,
    workflow.summary,
    workflow.category,
    ...workflow.tools,
    ...workflow.tags,
  ]
    .join(" ")
    .toLocaleLowerCase("ko-KR");

const resourceById = new Map(publishedResources.map((resource) => [resource.id, resource]));

export const publishedWorkflows: readonly WorkflowModel[] = workflows.filter(
  (workflow) => workflow.isPublished,
);

export const getWorkflowBySlug = (slug: string): WorkflowModel | undefined =>
  publishedWorkflows.find((workflow) => workflow.slug === slug);

export const searchWorkflows = ({
  query,
  category,
}: {
  readonly query: string;
  readonly category: WorkflowCategory | undefined;
}): readonly WorkflowModel[] => {
  const trimmedQuery = query.trim().toLocaleLowerCase("ko-KR");

  return publishedWorkflows
    .filter((workflow) => category === undefined || workflow.category === category)
    .filter(
      (workflow) => trimmedQuery.length === 0 || searchableText(workflow).includes(trimmedQuery),
    )
    .toSorted((left, right) => {
      if (left.isFeatured !== right.isFeatured) {
        return left.isFeatured ? -1 : 1;
      }

      return right.updatedAt.localeCompare(left.updatedAt);
    });
};

export const countWorkflowsByCategory = (category: WorkflowCategory): number =>
  publishedWorkflows.filter((workflow) => workflow.category === category).length;

export const getWorkflowResources = (workflow: WorkflowModel): readonly Resource[] =>
  workflow.resources
    .map((resourceId) => resourceById.get(resourceId))
    .filter((resource): resource is Resource => resource !== undefined);

export const getRelatedWorkflows = (workflow: WorkflowModel): readonly WorkflowModel[] =>
  workflow.relatedWorkflowIds
    .map((workflowId) =>
      publishedWorkflows.find(
        (publishedWorkflow) =>
          publishedWorkflow.id === workflowId && publishedWorkflow.id !== workflow.id,
      ),
    )
    .filter((relatedWorkflow): relatedWorkflow is WorkflowModel => relatedWorkflow !== undefined)
    .slice(0, 3);
