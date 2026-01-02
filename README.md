# Oxfd.js

The first JavaScript API Wrapper for the  [Oxford Response API](https://docs.oxfd.re/). Currently in V1.0.0, it features all available API Endpoints.

## Installation

Install using npm:
```
npm install oxfd.js
```
or 
```
npm i oxfd.js
```

## 🛠️ Usage

``` javascript
// Import the main Wrapper from the NPM Package
import OXFDClient from "oxfd.js";

// Use this if you use CommonJS
const OXFDClient = require("oxfd.js");

//Initialize with your servers API Key
const api = new OXFDClient("ADD YOUR API KEY HERE");

(async () => {
  try {
    //Retrieve basic server info
    const serverInfo = await api.getServerInfo();
    console.log("Server Info:", serverInfo);

    //Retrieve basic player info
    const players = await api.getPlayers();

    //Retrieve basic Queue info
    const queue = await api.getQueue();

    //Retrieve basic ban info
    const bans = await api.getBans();

    //Retrieve Killlogs
    const kl = await api.getKillLogs();

    //Retrieve Command Logs
    const cmdl = await api.getCommandLogs();

    //Retrieve Modcalls
    const modcalls = await api.getModCalls();

    //Execute a command
    const cmd = await api.executeCommand("announce Hello, Oxford RP!");

  } catch (err) {
    console.error("API Error:", err);
  }
})();
```

## ⚙️ Advanced Config

```javascript
//Only recommended for those who really know what they are doing

//Default API Import (recommended for beginners)
const api = new OXFDClient("YOUR SERVERS API KEY");

// Bring in rate limits (recommended if you have heavy command usage)
const strictAPI = new OXFDClient("YOUR API KEY SHOULD BE HERE", {
  maxRetries: 5,      // Retry up to 5 times on API 429 Errors
  timeout: 10000      // Request timeout in ms
});

//Disable rate limiting (Use with caution and only if you really know whyt you are doing)
const noRateLimitAPI = new OXFDClient("YOUR API KEY SHOULD BE HERE", {
  maxRetries: ,
});
```

