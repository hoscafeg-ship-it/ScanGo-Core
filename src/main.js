import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pages.css";

import { createAppShell, startAppShell } from "./app/AppShell.js";

document.querySelector("#app").innerHTML = createAppShell();

startAppShell();