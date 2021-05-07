# rclim95-home

Hi! This is the source code that powers my home page at https://www.rclim95.com.

## Building It

In order to build this website, you'll need to have to [NodeJS](https://nodejs.org/en/) and
[Node Package Manager (npm)](https://www.npmjs.com/) installed.

Also, make a copy of the [`config.example.json`](/src/config/config.example.json) file under `src/config`,
call it `config.json`, and prepopulate it with a [Steam Web API Key](https://steamcommunity.com/dev/apikey)
and your Steam User ID (should be a 64-digits numerical ID) like the example JSON config file.

Then in your favorite terminal, run the following commands:

```bash
$ npm install       # Install all dependencies
$ npm run build     # Build the frontend and backend
$ npm start         # Run the server (on localhost:8000)
```