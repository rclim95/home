import config from "../config/config.json";
import http from "http";
import { Game } from "../types";
import { isArray } from "lodash";

const BASE_URL_STORE = "https://store.steampowered.com/app/";
const BASE_URL_ICON = "http://media.steampowered.com/steamcommunity/public/images/apps/";
const BASE_URL_RECENTLY_PLAYED_GAMES = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?format=json";

/**
 * Chooses an element within `array` randomly.
 * @param array The array to choose an element from.
 * @returns One of the element inside `array`. If `array` is empty, then `null` is returned.
 */
export function choose<TElement>(array: TElement[]): TElement | null {
    if (array.length === 0) {
        return null;
    }

    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

/**
 * Gets the recently played game for a user (defined in `config.json`) on Steam.
 * @returns A `Promise` that'll return the most recently-played `Game` on Steam or `null` if the user hasn't played a game recently.
 */
export function getRecentlyPlayedGame(): Promise<Game | null> {
    return new Promise((resolve, reject) => {
        let url = `${BASE_URL_RECENTLY_PLAYED_GAMES}&key=${config.steam.key}&steamid=${config.steam.userid}`;
        http.get(url, (res) => {
            res.on("data", d => {
                let jsonResponse = JSON.parse(d);
                let games: any[] = jsonResponse["response"]["games"];

                // If Steam's API doesn't return an array for some reason, set to an empty array
                // by default.
                if (!isArray(games)) {
                    games = [];
                }

                let recentGame = choose(games);
                if (recentGame !== null) {
                    return resolve({
                        name: recentGame["name"],
                        storeUrl: `${BASE_URL_STORE}${recentGame["appid"]}`,
                        iconUrl: `${BASE_URL_ICON}${recentGame["appid"]}/${recentGame["img_icon_url"]}.jpg`
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