import { CSSProperties } from "react";

export interface ManifestUser {
    name: string;
    twitterUrl?: string;
    twitchUrl?: string;
}

export interface ManifestLogo {
    url: string;

    css?: CSSProperties;
}

export interface ManifestEntryTheme {
    logo?: ManifestLogo;

    textColor?: string;
    borderColor?: string;

    bgColor?: string;
    bgImage?: string;
    bgVideo?: string;
}

export interface ManifestEntry {
    title: string;
    text?: string;

    time: string; // HH:MM
    date: string; // MM/DD

    theme?: ManifestEntryTheme;

    collabers?: ManifestUser[];
    host?: ManifestUser;
}

export interface Manifest {
    timezone: string;
    entries: ManifestEntry[];
}
