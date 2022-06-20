import { isSameDay, parse } from "date-fns";
import { HYLICS_THEME, NEON_WHITE_THEME, PHASMO_THEME } from "./themes";
import { Manifest, ManifestEntry } from "./types";
import { ONYX_PASTELS } from "./users";

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
        {
            title: "Phasmophobia",
            date: "06/23",
            time: "6:30pm",
            theme: PHASMO_THEME,

            collabers: [ONYX_PASTELS],
        },
    ],
};

export function getManifestEntryByDate(date: Date): ManifestEntry | undefined {
    return MANIFEST.entries.find(entry => {
        let thisDate = new Date();
        thisDate = parse(entry.date, "MM/dd", thisDate);

        return isSameDay(thisDate, date);
    });
}
