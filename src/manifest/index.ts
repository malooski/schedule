import { HYLICS_THEME, NEON_WHITE_THEME } from "./themes";
import { Manifest } from "./types";

export const MANIFEST: Manifest = {
    timezone: "America/Chicago",
    entries: [
        {
            title: "Neon White",
            date: "06/21",
            time: "6:30pm",

            theme: NEON_WHITE_THEME,
        },
        {
            title: "Hylics",
            date: "06/22",
            time: "6:30pm",

            theme: HYLICS_THEME,
        },
    ],
};
