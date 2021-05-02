import config from "../config.json";
import http from "http";
import { Game } from "../types";

const BASE_URL_STORE = "https://store.steampowered.com/app/";
const BASE_URL_RECENTLY_PLAYED_GAMES = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?format=json";

/**
 * Gets the recently played game for a user (defined in `config.json`) on Steam.
 * @returns A `Promise` that'll return the most recently-played `Game` on Steam or `null` if the user hasn't played a game recently.
 */
export function getRecentlyPlayedGame(): Promise<Game | null> {
    return new Promise((resolve, reject) => {
        let url = `${BASE_URL_RECENTLY_PLAYED_GAMES}&key=${config.steam.key}&steamid=${config.steam.id}&count=1`;
        http.get(url, (res) => {
            res.on("data", d => {
                let jsonResponse = JSON.parse(d);
                let recentGame = jsonResponse["response"]["games"][0];
                if (recentGame !== undefined) {
                    return resolve({
                        name: recentGame["name"],
                        storeUrl: `${BASE_URL_STORE}${recentGame["appid"]}`,
                        iconUrl: `http://media.steampowered.com/steamcommunity/public/images/apps/${recentGame["appid"]}/${recentGame["img_icon_url"]}.jpg`
                    });
                }
                else {
                    resolve(null);
                }
            });
            res.on("error", e => {
                reject(e);
            });
        });
    });
}