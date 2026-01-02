import { EmbedBuilder } from "discord.js";

export function serverEmbed(server) {
  return new EmbedBuilder()
    .setTitle("🟢 Server Status")
    .addFields(
      { name: "Players", value: String(server.players), inline: true },
      { name: "Queue", value: String(server.queue), inline: true }
    )
    .setColor(0x2ecc71)
    .setTimestamp();
}

export function playersEmbed(players) {
  return new EmbedBuilder()
    .setTitle("👥 Online Players")
    .setDescription(
      players.length ? players.map(p => `• ${p.name}`).join("\n") : "No players online"
    )
    .setColor(0x3498db);
}
