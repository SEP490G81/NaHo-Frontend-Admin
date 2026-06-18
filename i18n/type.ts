import { Messages } from "next-intl";

export type MetadataTitleKey = keyof Messages["common"]["metadata"]["title"];

export type AllRoute =
    | "/dashboard"
    | "/user-management"
    | "/prompt-moderation"
    | "/settings"
    | "/help-and-support";

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
export type AnchorRoute = `${StaticRoute}#${string}`;
