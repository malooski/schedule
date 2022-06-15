import { CSSProperties } from "react";

import fortniteLogoUrl from "./assets/logos/Fortnite Logo.png";
import phasmoLogoUrl from "./assets/logos/Phasmo Logo.png";

interface LogoMetadata {
    url: string;

    css?: CSSProperties;
}

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

export interface ManifestScheduleEntry {
    title: string;

    time: string; // HH:MM
    date: string; // MM/DD

    logo?: LogoMetadata;

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
        },
        {
            title: "Fortnite",
            date: "06/16",
            time: "6:30pm",
            logo: FORTNITE_LOGO,
        },
    ],
};
