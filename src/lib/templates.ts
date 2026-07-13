import { templates } from "@/data/templates";
import type { Template, TemplateCategory, TemplateDifficulty, TemplateType } from "@/types/template";

export type TemplateFilterCriteria = {
  readonly query: string;
  readonly categories: readonly TemplateCategory[];
  readonly types: readonly TemplateType[];
  readonly difficulties: readonly TemplateDifficulty[];
};

type FilterTemplatesInput = {
  readonly templates: readonly Template[];
  readonly criteria: TemplateFilterCriteria;
};

const searchableText = (template: Template): string =>
  [
    template.title,
    template.summary,
    template.description,
    template.category,
    ...template.tools,
    ...template.tags,
  ]
    .join(" ")
    .toLocaleLowerCase("ko-KR");

const hasSelectedValue = <Value extends string>(
  selectedValues: readonly Value[],
  value: Value,
): boolean => selectedValues.length === 0 || selectedValues.includes(value);

export const publishedTemplates: readonly Template[] = templates.filter(
  (template) => template.isPublished,
);

export const getTemplateBySlug = (slug: string): Template | undefined =>
  publishedTemplates.find((template) => template.slug === slug);

export const filterTemplates = ({
  templates,
  criteria,
}: FilterTemplatesInput): readonly Template[] => {
  const query = criteria.query.trim().toLocaleLowerCase("ko-KR");

  return templates.filter((template) => {
    const matchesQuery = query.length === 0 || searchableText(template).includes(query);
    const matchesCategory = hasSelectedValue(criteria.categories, template.category);
    const matchesType = hasSelectedValue(criteria.types, template.templateType);
    const matchesDifficulty = hasSelectedValue(criteria.difficulties, template.difficulty);

    return matchesQuery && matchesCategory && matchesType && matchesDifficulty;
  });
};

export const sortTemplates = (templates: readonly Template[]): readonly Template[] =>
  templates
    .map((template, index) => ({ template, index }))
    .toSorted((left, right) => {
      if (left.template.isFeatured !== right.template.isFeatured) {
        return left.template.isFeatured ? -1 : 1;
      }

      const dateSort = right.template.updatedAt.localeCompare(left.template.updatedAt);
      return dateSort === 0 ? left.index - right.index : dateSort;
    })
    .map((item) => item.template);

export const countTemplatesByCategory = (
  templates: readonly Template[],
  category: TemplateCategory,
): number => templates.filter((template) => template.category === category).length;

export const countTemplatesByType = (
  templates: readonly Template[],
  type: TemplateType,
): number => templates.filter((template) => template.templateType === type).length;

export const countTemplatesByDifficulty = (
  templates: readonly Template[],
  difficulty: TemplateDifficulty,
): number => templates.filter((template) => template.difficulty === difficulty).length;
