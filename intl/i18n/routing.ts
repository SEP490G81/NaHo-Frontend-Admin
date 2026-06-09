import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["vi"],

    // Used when no locale matches
    defaultLocale: "vi",
    // Hide all prefix in the url such as /en, /vi, /ja
    // localePrefix: 'never',

    pathnames: {
        "/dashboard": {
            vi: "/bang-dieu-khien",
        },
        "/user-management": {
            vi: "/quan-li-nguoi-dung",
        },
        "/content-manager/topics": {
            vi: "/quan-ly-noi-dung/chu-de",
        },
        "/content-manager/topics/new": {
            vi: "/quan-ly-noi-dung/chu-de/tao-moi",
        },
        "/content-manager/topics/[id]": {
            vi: "/quan-ly-noi-dung/chu-de/[id]",
        },
        "/content-manager/topics/[id]/questions": {
            vi: "/quan-ly-noi-dung/chu-de/[id]/cau-hoi",
        },
        "/settings": {
            vi: "/cai-dat",
        },
        "/help-and-support": {
            vi: "/tro-giup-va-ho-tro",
        },
    },
});
