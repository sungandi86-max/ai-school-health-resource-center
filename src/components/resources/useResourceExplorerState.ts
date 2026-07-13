"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Difficulty, ResourceType, WorkCategory } from "@/types/resource";
import {
  TOOL_OPTIONS,
  isDifficulty,
  isResourceType,
  isSortOption,
  isWorkCategory,
  type SortOption,
} from "@/lib/resourceLabels";
import type { ResourceFilterCriteria } from "@/lib/resourceFilters";

type ExplorerState = ResourceFilterCriteria & {
  readonly sort: SortOption;
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

const parseTools = (value: string | null): readonly string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => TOOL_OPTIONS.some((tool) => tool === item));
};

const toggleValue = <Value extends string>(
  values: readonly Value[],
  value: Value,
): readonly Value[] =>
  values.includes(value) ? values.filter((currentValue) => currentValue !== value) : [...values, value];

const countActiveFilters = (state: ExplorerState): number =>
  state.categories.length + state.types.length + state.tools.length + state.difficulties.length;

const hasConditions = (state: ExplorerState): boolean =>
  state.query.trim().length > 0 || countActiveFilters(state) > 0;

export function useResourceExplorerState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<ExplorerState>(() => {
    const sortParam = searchParams.get("sort") ?? "featured";

    return {
      query: searchParams.get("q") ?? "",
      categories: parseCsv(searchParams.get("category"), isWorkCategory),
      types: parseCsv(searchParams.get("type"), isResourceType),
      tools: parseTools(searchParams.get("tool")),
      difficulties: parseCsv(searchParams.get("difficulty"), isDifficulty),
      sort: isSortOption(sortParam) ? sortParam : "featured",
    };
  }, [searchParams]);

  const syncState = (nextState: ExplorerState, mode: UrlHistoryMode) => {
    const nextParams = new URLSearchParams();
    const query = nextState.query.trim();

    if (query.length > 0) {
      nextParams.set("q", query);
    }

    if (nextState.types.length > 0) {
      nextParams.set("type", nextState.types.join(","));
    }

    if (nextState.tools.length > 0) {
      nextParams.set("tool", nextState.tools.join(","));
    }

    if (nextState.categories.length > 0) {
      nextParams.set("category", nextState.categories.join(","));
    }

    if (nextState.difficulties.length > 0) {
      nextParams.set("difficulty", nextState.difficulties.join(","));
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
        {
          query: "",
          categories: [],
          types: [],
          tools: [],
          difficulties: [],
          sort: "featured",
        },
        "push",
      );
    },
    removeQuery: () => {
      syncState({ ...state, query: "" }, "push");
    },
    setQuery: (query: string) => {
      syncState({ ...state, query }, "replace");
    },
    setSort: (sort: SortOption) => {
      syncState({ ...state, sort }, "push");
    },
    toggleCategory: (category: WorkCategory) => {
      syncState({ ...state, categories: toggleValue(state.categories, category) }, "push");
    },
    toggleType: (type: ResourceType) => {
      syncState({ ...state, types: toggleValue(state.types, type) }, "push");
    },
    toggleTool: (tool: string) => {
      syncState({ ...state, tools: toggleValue(state.tools, tool) }, "push");
    },
    toggleDifficulty: (difficulty: Difficulty) => {
      syncState(
        {
          ...state,
          difficulties: toggleValue(state.difficulties, difficulty),
        },
        "push",
      );
    },
  };
}
