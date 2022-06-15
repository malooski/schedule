import { CSSProperties } from "react";

import phasmoLogoUrl from "./assets/logos/Phasmo Logo.png";

interface User {
    name: string;
    twitterUrl: string;
}

const USERS = {
    tinyKitBee: {
        name: "TinyKitBee",
        twitterUrl: "https://twitter.com/tinykitbee",
    },
    theEtHunter: {
        name: "TheETHunter",
        twitterUrl: "https://twitter.com/TheETHunter",
    },
};

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

export interface ManifestScheduleEntry {
    title: string;

    time: string; // HH:MM
    date: string; // MM/DD

    logo?: LogoMetadata;

    color?: string;

    collabers?: User[];
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
            collabers: [USERS.tinyKitBee, USERS.theEtHunter],
        },
    ],
};
