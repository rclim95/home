const normalize = require("normalize.css");
const style = require("./css/app.css");

import { Game } from "../types";

async function updateWhatIsRichardPlaying() {
    try {
        let response = await fetch("/steam");
        let responseAsJson = await response.json();
        if (responseAsJson["success"]) {
            let game: Game = responseAsJson["game"];
            let recentlyPlayedElm = document.querySelector("#recently-played");
            if (recentlyPlayedElm != null) {
                recentlyPlayedElm.innerHTML = `probably <a href="${game.storeUrl}">${game.name}</a>`;
            }
        }
    }
    catch (e) {
        // Log the error, but don't do anything.
        console.error("Failed to retrieve most recent Steam game:", e);
    }
}

updateWhatIsRichardPlaying();