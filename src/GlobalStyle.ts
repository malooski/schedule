import { createGlobalStyle } from "styled-components";

import starFightersFont from "./assets/Stars Fighters.ttf";

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
`;
