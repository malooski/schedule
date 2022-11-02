import { createManifest } from "./lib";

export const MANIFEST = createManifest({
    timezone: "America/Chicago",
    entries: [
        {
            title: "Hylics",
            date: "11/02",
            time: "6:30pm",
        },
        {
            title: "Art",
            date: "11/03",
            time: "6:30pm",
        },
        {
            title: "Hylics II",
            date: "11/05",
            time: "10:00am",
        },
    ],
});
