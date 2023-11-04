import { Manifest, ManifestEntry } from "./types";

import alanWakeImg from "../assets/alanwake2.webp";

// YYYY-MM-DDTHH:mm:ss.sssZ
export const MANIFEST = new Manifest({
    entries: [
        new ManifestEntry({
            title: "Alan Wake 2",
            date: "7 November 2023 18:30 CST",
            bgImg: alanWakeImg,
        }),
        new ManifestEntry({
            title: "Alan Wake 2",
            date: "14 November 2023 18:30 CST",
            bgImg: alanWakeImg,
        }),
    ],
});
