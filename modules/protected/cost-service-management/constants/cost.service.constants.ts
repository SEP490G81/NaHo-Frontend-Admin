import {
    AzureCostGranularity,
    AzureCostPresetRange,
    ServiceProviderTab,
} from "../types/azure.cost.type";

export interface ProviderTabOption {
    id: ServiceProviderTab;
    labelKey: "tabs.azure" | "tabs.openai" | "tabs.aws";
    enabled: boolean;
}

export interface PresetRangeOption {
    value: AzureCostPresetRange;
    labelKey: "presetLast6Months" | "presetLast30Days" | "presetLast12Months" | "presetCustom";
}

export interface GranularityOption {
    value: AzureCostGranularity;
    labelKey: "granularityMonthly" | "granularityDaily";
}

export const PROVIDER_TABS: ProviderTabOption[] = [
    { id: "azure", labelKey: "tabs.azure", enabled: true },
    { id: "openai", labelKey: "tabs.openai", enabled: false },
    { id: "aws", labelKey: "tabs.aws", enabled: false },
];

export const PRESET_RANGE_OPTIONS: PresetRangeOption[] = [
    { value: "last6Months", labelKey: "presetLast6Months" },
    { value: "last30Days", labelKey: "presetLast30Days" },
    { value: "last12Months", labelKey: "presetLast12Months" },
    { value: "custom", labelKey: "presetCustom" },
];

export const GRANULARITY_OPTIONS: GranularityOption[] = [
    { value: "Monthly", labelKey: "granularityMonthly" },
    { value: "Daily", labelKey: "granularityDaily" },
];

export const DEFAULT_PRESET_RANGE: AzureCostPresetRange = "last6Months";


