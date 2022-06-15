import { createGlobalStyle } from "styled-components";

import starFightersFont from "./assets/Stars Fighters.ttf";

export default createGlobalStyle`

    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    @font-face {
        font-family: "Star Fighters";
        src: url("${starFightersFont}");
    }
`;
