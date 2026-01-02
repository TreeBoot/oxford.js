export class Servers {
    constructor (api) {
        this.api = api;
    }

      getServerInfo() { return this.api.getServerInfo(); }
      getPlayers() { return this.api.getPlayers(); }
      getQueue() { return this.api.getQueue(); }
      getBans() { return this.api.getBans(); }
      getVehicles() { return this.api.getVehicles(); }
      getRobberies() { return this.api.getRobberies(); }
      
}

export class Logs {
    constructor (api) {
        this.api = api;
    }

      getKillLogs() { return this.api.getKillLogs(); }
      getCommandLogs() { return this.api.getCommandLogs(); }
      getModCalls() { return this.api.getModCalls(); }
      getRadioCalls() {return this.api.getRadioCalls();}
      getJoinLogs() { return this.api.getJoinLogs();}
      
}

export class Commands {
    constructor (api) {
        this.api = api;
    }

      executeCommand(command) {
        return this.api.executeCommand(command)
      }
      
}