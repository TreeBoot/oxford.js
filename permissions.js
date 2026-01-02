import { PermissionFlagsBits } from "discord.js";

export function checkPermissions(interaction, options = {}) {
  const member = interaction.member;
  if (!member) return false;

  if (
    options.adminOverride &&
    member.permissions.has(PermissionFlagsBits.Administrator)
  ) return true;

  if (options.permissions?.length) {
    if (!options.permissions.some(p => member.permissions.has(p))) return false;
  }

  if (options.roles?.length) {
    if (!member.roles.cache.some(r => options.roles.includes(r.id))) return false;
  }

  return true;
}

export function deny(interaction) {
  return interaction.reply({
    content: "❌ You do not have permission to use this command.",
    ephemeral: true
  });
}
