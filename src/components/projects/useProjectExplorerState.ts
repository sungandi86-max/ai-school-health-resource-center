"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  isProjectCategory,
  isProjectSortOption,
  isProjectStatus,
  isProjectTool,
  isProjectType,
  type ProjectSortOption,
} from "@/lib/projectLabels";
import type { ProjectFilterCriteria } from "@/lib/projects";
import type { ProjectCategory, ProjectStatus, ProjectToolName, ProjectType } from "@/types/project";

type ProjectExplorerState = ProjectFilterCriteria & {
  readonly sort: ProjectSortOption;
};

type UrlHistoryMode = "push" | "replace";

const parseCsv = <Value extends string>(
  value: string | null,
  isAllowed: (value: string) => value is Value,
): readonly Value[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .filter(isAllowed);
};

const toggleValue = <Value extends string>(
  values: readonly Value[],
  value: Value,
): readonly Value[] =>
  values.includes(value) ? values.filter((currentValue) => currentValue !== value) : [...values, value];

const countActiveFilters = (state: ProjectExplorerState): number =>
  state.types.length + state.statuses.length + state.tools.length + state.categories.length;

const hasConditions = (state: ProjectExplorerState): boolean =>
  state.query.trim().length > 0 || countActiveFilters(state) > 0;

export function useProjectExplorerState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<ProjectExplorerState>(() => {
    const sortParam = searchParams.get("sort") ?? "featured";

    return {
      query: searchParams.get("q") ?? "",
      types: parseCsv(searchParams.get("type"), isProjectType),
      statuses: parseCsv(searchParams.get("status"), isProjectStatus),
      tools: parseCsv(searchParams.get("tool"), isProjectTool),
      categories: parseCsv(searchParams.get("category"), isProjectCategory),
      sort: isProjectSortOption(sortParam) ? sortParam : "featured",
    };
  }, [searchParams]);

  const syncState = (nextState: ProjectExplorerState, mode: UrlHistoryMode) => {
    const nextParams = new URLSearchParams();
    const query = nextState.query.trim();

    if (query.length > 0) {
      nextParams.set("q", query);
    }

    if (nextState.types.length > 0) {
      nextParams.set("type", nextState.types.join(","));
    }

    if (nextState.statuses.length > 0) {
      nextParams.set("status", nextState.statuses.join(","));
    }

    if (nextState.tools.length > 0) {
      nextParams.set("tool", nextState.tools.join(","));
    }

    if (nextState.categories.length > 0) {
      nextParams.set("category", nextState.categories.join(","));
    }

    if (nextState.sort !== "featured") {
      nextParams.set("sort", nextState.sort);
    }

    const queryString = nextParams.toString();
    const nextUrl = queryString.length > 0 ? `${pathname}?${queryString}` : pathname;
    const options = { scroll: false };

    if (mode === "push") {
      router.push(nextUrl, options);
      return;
    }

    router.replace(nextUrl, options);
  };

  return {
    state,
    activeFilterCount: countActiveFilters(state),
    hasActiveConditions: hasConditions(state),
    clearAll: () => {
      syncState(
        { query: "", types: [], statuses: [], tools: [], categories: [], sort: "featured" },
        "push",
      );
    },
    removeQuery: () => {
      syncState({ ...state, query: "" }, "push");
    },
    setQuery: (query: string) => {
      syncState({ ...state, query }, "replace");
    },
    setSort: (sort: ProjectSortOption) => {
      syncState({ ...state, sort }, "push");
    },
    toggleType: (type: ProjectType) => {
      syncState({ ...state, types: toggleValue(state.types, type) }, "push");
    },
    toggleStatus: (status: ProjectStatus) => {
      syncState({ ...state, statuses: toggleValue(state.statuses, status) }, "push");
    },
    toggleTool: (tool: ProjectToolName) => {
      syncState({ ...state, tools: toggleValue(state.tools, tool) }, "push");
    },
    toggleCategory: (category: ProjectCategory) => {
      syncState({ ...state, categories: toggleValue(state.categories, category) }, "push");
    },
  };
}
