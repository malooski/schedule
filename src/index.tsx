import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.scss";

import "./assets/fonts/digital-7 (mono).ttf";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
