import express from "express";
const app = express();
import axios from 'axios';
import cors from "cors";
app.use(cors());

import fs from 'fs';
import readline from "readline";
import {google} from "googleapis";

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.get('/google/callback', async function (req, res, next) {
    console.log(req.query);

})

app.get('/', async (req, res) => {
    app.use(cors(corsOptions));
    const scope = ["https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/youtubepartner",
        "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
        "https://www.googleapis.com/auth/yt-analytics.readonly"];

    // Load client secrets from a local file.
    fs.readFile("./SECRET_FILE.json", (err, content) => {
        if (err) {
            return console.log("Cannot load client secret file:", err);
        }

        // Authorize a client with credentials, then make API call.
        const credentials = JSON.parse(content);
        console.log(credentials);
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );

        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scope
        });
        console.log("Visit this URL to authorize this app:", authUrl);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question("Enter the auth code from that URL: ", code => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return callApi(err);
                oAuth2Client.setCredentials(token);
                callApi(oAuth2Client);
            });
        });
    });

    /**
         * Define and execute the API request.
         * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
         */
    var callApi = auth => {
        const youtubeAnalytics = google.youtubeAnalytics({version: "v2", auth});
        var dailyAnalytics;
        var overallAnalytics;
        youtubeAnalytics.reports
            .query({
                dimensions: "day",
                endDate: "2023-04-01",
                ids: "channel==MINE",
                maxResults: 31,
                metrics: "views",
                startDate: "2021-02-01"
            })
            .then(data => {
                dailyAnalytics = data.data;
                console.log(dailyAnalytics);
                res.json({dailyAnalytics});
            })
            .catch(error => console.log("The API returned an error: ", error.errors));
        youtubeAnalytics.reports
            .query({
                endDate: "2023-03-01",
                ids: "channel==MINE",
                maxResults: 31,
                metrics: "subscribersGained",
                startDate: "2023-02-01"
            })
            .then(data => {
                overallAnalytics = data.data
                console.log(overallAnalytics);
                res.json({overallAnalytics});
            })
            .catch(error => console.log("The API returned an error: ", error.errors));
    };
});




const PORT = 8080;

const start = async (port) => {
    app.listen(port, () => {
        console.log(`Server running on port: http://localhost:${port}`);
    });
};


start(PORT);





























