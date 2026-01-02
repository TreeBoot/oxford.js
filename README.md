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

### Using Managers

```javascript
  // Import Package using ESM
  import OXFDClient from 'oxfd.js';
  
  // Import package using CommonJS
  const OXFDClient = require("oxfd.js");

  const api = new OXFDClient("YOUR API KEY");

  //Directly access Data via their manager
  const serverInfo = await api.servers.getServer();
  const killLogs = await api.logs.getKillLogs();
  await api.commands.executeCommand("announce Hiya!");
```

## General Functions and how they are parented/managed

```javascript

Server {
  getServerInfo()      // Get Information about the server
  getPlayers()         // Get Information about the Players
  getQueue()           // Get Information about the queue
  getBans()            // Get the bans
  getVehicles()        // Get vehicle information
  getRobberies()       // Get informations about the Robbery Locations
}

Logs {
  getKillLogs()        // Get killlogs
  getCommandLogs()     // Get Command logs
  getModCalls()        // Get ModCalls
  getRadioCalls()      // Get Radio Calls
  getJoinLogs()        // Get Join Logs
}

Commands {
  executeCommand(command)   // Execute a command, command input is required tho
}
```

## Error Handling
```javascript
//ESM
  import OXFDClient from "oxfd.js";

// CommonJS
  const OXFDClient = require("oxfd-api");

  const api = new OXFDClient("YOUR API KEY");

  (async () => {
  try {
    // Attempt to get server info
    const serverInfo = await api.getServerInfo();
    console.log("Server Info:", serverInfo);

  } catch (err) {
    // Check if the error is due to hitting the rate limit (HTTP 429)
    if (err.message.includes("429")) {
      console.log("⚠️ Rate limit exceeded. Wait a few seconds and retry.");
    }
    // Check if the request was aborted (timeout)
    else if (err.message.includes("The operation was aborted")) {
      console.log("⚠️ Request timed out. Try again later.");
    }
    // Catch-all for any other API errors (non-2xx responses, invalid server key, etc.)
    else {
      console.error("❌ API Error:", err);
    }
  }
})();
```
### Rate limit handling
The wrapper automatically retries 429 errors up to 3 times, or maxRetries depending on your usage type.
To manuallyadjust your maxRetries variable for error handling, use the following API Initialisation:

```javascript
const api = new OXFDClient("YOUR_KEY", { maxRetries: 5 });
```

### Timeout handling
The default request timeout is set to 10 seconds. If you would like to increase/decrease it, use the following code:
 ⚠️ IMPORTANT ⚠️
  Timeout needs to be formatted in ms.
```javascript
const api = new OXFDClient("YOUR_KEY", { timeout: 15000 });
```

### General API errors
Any response with a non-2xx status code will automatically throw any error in the console. 
Example: invalid server key, missing endpoint, etc.

### Networking/Abortion Errors
Includes network issues, invalid URLs, or request aborted due to timeout


## API Response
You can find the output of every endpoint [here](https://docs.oxfd.re/)