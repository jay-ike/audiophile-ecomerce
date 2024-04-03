/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import routes from "./routes.js";
import FocusScope from "./components/focus-scope";
import Stepper from "./components/step-by-step";
import { NavProvider } from "./components";



import "./assets/styles/index.css";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
    );
}

FocusScope.define();
Stepper.define();

render(() => (
    <NavProvider>
        <Router>{routes}</Router>
    </NavProvider>
), root);
