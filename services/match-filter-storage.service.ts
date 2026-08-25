export interface MatchFilterPreferences {
  selectedFilters: string[];
  isActive: boolean;
}

const MATCH_FILTER_STORAGE_KEY = "ghd-varzesh:match-filter-preferences";

const DEFAULT_MATCH_FILTER_PREFERENCES: MatchFilterPreferences = {
  selectedFilters: [],
  isActive: true,
};

export function loadMatchFilterPreferences(): MatchFilterPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_MATCH_FILTER_PREFERENCES;
  }

  try {
    const storedPreferences = window.localStorage.getItem(MATCH_FILTER_STORAGE_KEY);
    if (!storedPreferences) {
      return DEFAULT_MATCH_FILTER_PREFERENCES;
    }

    const parsedPreferences: unknown = JSON.parse(storedPreferences);
    if (!parsedPreferences || typeof parsedPreferences !== "object") {
      return DEFAULT_MATCH_FILTER_PREFERENCES;
    }

    const preferences = parsedPreferences as Partial<MatchFilterPreferences>;
    return {
      selectedFilters: Array.isArray(preferences.selectedFilters)
        ? preferences.selectedFilters.filter((filter): filter is string => typeof filter === "string")
        : [],
      isActive: typeof preferences.isActive === "boolean"
        ? preferences.isActive
        : DEFAULT_MATCH_FILTER_PREFERENCES.isActive,
    };
  } catch {
    return DEFAULT_MATCH_FILTER_PREFERENCES;
  }
}

export function saveMatchFilterPreferences(preferences: MatchFilterPreferences): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(MATCH_FILTER_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}
