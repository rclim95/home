import * as path from "path";
import * as express from "express";

import { SteamStatus } from "../types";
import { getRecentlyPlayedGame } from "./utils";

const port = 8000;
const app = express();
app.use("/", express.static(path.join(__dirname, "..", "client")));

app.get("/status/steam", async (req, res) => {
    try {
        let game = await getRecentlyPlayedGame();
        if (game === null) {
            // The user hasn't played a game recently.
            res.json(<SteamStatus>{
                success: false,
                game: null,
                error: null
            });
        }
        else {
            res.json(<SteamStatus>{
                success: true,
                game: game,
                error: null
            });
        }
    }
    catch (e) {
        res.status(500)
           .json(<SteamStatus>{
               success: false,
               game: null,
               error: e
           });
    }
});

app.listen(port, () => {
    console.log(`The server is now listening on http://localhost:${port} 😊`);
});