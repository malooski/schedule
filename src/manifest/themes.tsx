import { ManifestEntryTheme } from "./types";

import neonWhiteBgUrl from "../assets/backgrounds/Neon White Hero.jpg";
import neonWhiteLogoUrl from "../assets/logos/Neon White Logo.png";

import phasmoHero from "../assets/backgrounds/Phasmo Hero.jpg";
import phasmoLogo from "../assets/logos/Phasmo Logo.png";

import hylicsBg from "../assets/backgrounds/Hylics.jpg";
import hylicsLogo from "../assets/logos/Hylics.png";

export const CODING_VIDEO_URL =
    "https://malooski-public.s3.us-east-2.amazonaws.com/Coding+Background.mp4";

export const PHASMO_THEME: ManifestEntryTheme = {
    bgImage: `url("${phasmoHero}")`,
    logo: {
        url: phasmoLogo,
    },
};

export const NEON_WHITE_THEME: ManifestEntryTheme = {
    textColor: "white",
    borderColor: "white",
    bgColor: "#ffffff",
    bgImage: `url("${neonWhiteBgUrl}")`,

    logo: {
        url: neonWhiteLogoUrl,
    },
};

export const CODING_THEME: ManifestEntryTheme = {
    bgVideo: CODING_VIDEO_URL,
};

export const HYLICS_THEME: ManifestEntryTheme = {
    bgImage: `url("${hylicsBg}")`,
    logo: {
        url: hylicsLogo,
    },
};
