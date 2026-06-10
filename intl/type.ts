import { Messages } from "next-intl";

export type MetadataTitleKey = keyof Messages["metadata"]["title"];

export type AllRoute =
    | "/"
    | "/dashboard"
    | "/user-management"
    | "/content-manager/topics"
    | "/settings"
    | "/help-and-support";

export type RemoveDynamic<T> = T extends `${string}[${string}` ? never : T;
export type StaticRoute = RemoveDynamic<AllRoute>;
