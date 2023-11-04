import { Manifest, ManifestEntry } from "./types";

// YYYY-MM-DDTHH:mm:ss.sssZ
export const MANIFEST = new Manifest({
    entries: [
        new ManifestEntry({
            title: "Alan Wake 2",
            date: "5 November 2023 18:00 CST",
        }),
    ],
});
