"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { TemplateCategory, TemplateDifficulty, TemplateType } from "@/types/template";
import {
  isTemplateCategory,
  isTemplateDifficulty,
  isTemplateType,
} from "@/lib/templateLabels";
import type { TemplateFilterCriteria } from "@/lib/templates";

type TemplateCenterState = TemplateFilterCriteria;

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

const countActiveFilters = (state: TemplateCenterState): number =>
  state.categories.length + state.types.length + state.difficulties.length;

export function useTemplateCenterState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo<TemplateCenterState>(
    () => ({
      query: searchParams.get("q") ?? "",
      categories: parseCsv(searchParams.get("category"), isTemplateCategory),
      types: parseCsv(searchParams.get("type"), isTemplateType),
      difficulties: parseCsv(searchParams.get("difficulty"), isTemplateDifficulty),
    }),
    [searchParams],
  );

  const syncState = (nextState: TemplateCenterState, mode: UrlHistoryMode) => {
    const nextParams = new URLSearchParams();
    const query = nextState.query.trim();

    if (query.length > 0) {
      nextParams.set("q", query);
    }

    if (nextState.categories.length > 0) {
      nextParams.set("category", nextState.categories.join(","));
    }

    if (nextState.types.length > 0) {
      nextParams.set("type", nextState.types.join(","));
    }

    if (nextState.difficulties.length > 0) {
      nextParams.set("difficulty", nextState.difficulties.join(","));
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
    hasActiveConditions: state.query.trim().length > 0 || countActiveFilters(state) > 0,
    clearAll: () => {
      syncState({ query: "", categories: [], types: [], difficulties: [] }, "push");
    },
    removeQuery: () => {
      syncState({ ...state, query: "" }, "push");
    },
    setQuery: (query: string) => {
      syncState({ ...state, query }, "replace");
    },
    toggleCategory: (category: TemplateCategory) => {
      syncState({ ...state, categories: toggleValue(state.categories, category) }, "push");
    },
    toggleType: (type: TemplateType) => {
      syncState({ ...state, types: toggleValue(state.types, type) }, "push");
    },
    toggleDifficulty: (difficulty: TemplateDifficulty) => {
      syncState({ ...state, difficulties: toggleValue(state.difficulties, difficulty) }, "push");
    },
  };
}
