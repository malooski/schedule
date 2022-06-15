import { CSSProperties } from "react";

import phasmoLogoUrl from "./assets/logos/Phasmo Logo.png";
import phasmoBgUrl from "./assets/backgrounds/Phasmo Hero.jpg";
import fortniteLogoUrl from "./assets/logos/Fortnite Logo.png";
import fortniteBgUrl from "./assets/backgrounds/Fortnite Gameplay.mp4";

interface LogoMetadata {
    url: string;

    css?: CSSProperties;
}

interface EntryVideoBackground {
    type: "video";
    url: string;
}

interface EntryImageBackground {
    type: "image";
    url: string;
}

type EntryBackground = EntryVideoBackground | EntryImageBackground;

const PHASMO_LOGO: LogoMetadata = {
    url: phasmoLogoUrl,
    css: {
        width: "450px",
    },
};

const FORTNITE_LOGO: LogoMetadata = {
    url: fortniteLogoUrl,
    css: {
        width: "300px",
    },
};

const FORTNITE_BACKGROUND: EntryVideoBackground = {
    type: "video",
    url: fortniteBgUrl,
};

const PHASMO_BACKGROUND: EntryImageBackground = {
    type: "image",
    url: phasmoBgUrl,
};

export interface ManifestScheduleEntry {
    title: string;
    time: string; // HH:MM
    date: string; // MM/DD

    logo?: LogoMetadata;
    background?: EntryBackground;

    color?: string;
}

interface Manifest {
    timezone: string;
    entries: ManifestScheduleEntry[];
}

export const MANIFEST: Manifest = {
    timezone: "America/Chicago",
    entries: [
        {
            title: "Coding a Schedule Site",
            date: "06/14",
            time: "6:30pm",
        },
        {
            title: "Phasmophobia",
            date: "06/15",
            time: "6:30pm",
            logo: PHASMO_LOGO,
            background: PHASMO_BACKGROUND,
        },
        {
            title: "Fortnite",
            date: "06/16",
            time: "6:30pm",
            logo: FORTNITE_LOGO,
            background: FORTNITE_BACKGROUND,
        },
    ],
};
