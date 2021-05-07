import '@fortawesome/fontawesome-free/js/fontawesome'
import "@fortawesome/fontawesome-free/js/brands";
import template from "lodash/template";

import { Game, SteamStatus } from "../types";

import "./app.scss";
import html from "./app.html";
import config from "../config/config.json";

async function getSteamStatus(): Promise<Game> {
    try {
        let response = await fetch("/status/steam");
        let jsonResponse: SteamStatus = await response.json();
        if (jsonResponse.success) {
            return jsonResponse.game;
        }
    }
    catch (e) {
        console.error("Failed to get status from Steam:", e);
    }

    // If we're here, that means fetching the latest status from Steam failed for some reason. In
    // that case, use the defaults.
    return config.steam.defaults;
}

async function main() {
    let compileHTML = template(html);
    let element = document.createElement("div");
    element.innerHTML = compileHTML({
        steam: await getSteamStatus(),
        spotify: config.spotify.defaults
    });
    document.body.appendChild(element)
}

document.addEventListener("readystatechange", function (e) {
    if (this.readyState == 'interactive') {
        main();
    }
});
