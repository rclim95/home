import https from "https";
import path from "path";

import express from "express";

import * as steam from "./steam";

const app = express();
app.use("/", express.static(path.resolve(__dirname, "..", "client")));

app.get("/steam", async (req, res) => {
    try {
        let game = await steam.getRecentlyPlayedGame();
        if (game === null) {
            // The user hasn't played a game recently.
            res.json({
                success: false,
                game: null
            });
        }
        else {
            res.json({
                success: true,
                game: game
            });
        }
    }
    catch (e) {
        res.status(500)
           .json({
               error: e
           });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});