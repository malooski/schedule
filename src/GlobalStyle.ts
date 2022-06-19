import { createGlobalStyle } from "styled-components";

import starFightersFont from "./assets/fonts/Stars Fighters.ttf";
import digi7Font from "./assets/fonts/digital-7 (mono).ttf";

export default createGlobalStyle`

    body, html, #root {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    @font-face {
        font-family: "Star Fighters";
        src: url("${starFightersFont}");
    }

    @font-face {
        font-family: "Digital 7";
        src: url("${digi7Font}");
    }
`;
