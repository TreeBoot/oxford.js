const sleep = ms => new Promise(r => setTimeout(r, ms));

class OXFDClient {
  constructor(apiKey, options = {}) {
    if (!apiKey) throw new Error("OXFD API key is required");

    this.apiKey = apiKey;
    this.baseURL = options.baseURL || "https://api.oxfd.re/v1";
    this.timeout = options.timeout || 10000;
    this.maxRetries = options.maxRetries || 3;
  }

  async request(endpoint, method = "GET", body = null, attempt = 0) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "server-key": this.apiKey
        },
        body: body ? JSON.stringify(body) : null,
        signal: controller.signal
      });

      if (res.status === 429 && attempt < this.maxRetries) {
        const retryAfter = Number(res.headers.get("Retry-After")) || 2;
        await sleep(retryAfter * 1000);
        return this.request(endpoint, method, body, attempt + 1);
      }

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(`OXFD API ${res.status}: ${JSON.stringify(data)}`);
      }

      return data;
    } finally {
      clearTimeout(timer);
    }
  }

  getServerInfo() { return this.request("/server"); }
  getPlayers() { return this.request("/server/players"); }
  getQueue() { return this.request("/server/queue"); }
  getBans() { return this.request("/server/bans"); }
  getKillLogs() { return this.request("/server/killlogs"); }
  getCommandLogs() { return this.request("/server/commandlogs"); }
  getModCalls() { return this.request("/server/modcalls"); }

  executeCommand(command) {
    if (!command) throw new Error("Command is required");
    return this.request("/server/command", "POST", { command });
  }
}

module.exports = OXFDClient;
