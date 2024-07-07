const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  description: "shows bot uptime.",
  default_permission: false,
  timeout: 3000,
  category: "whitelist",
  userPerms: [Discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
interaction.reply(`${duration}`)
  }
}