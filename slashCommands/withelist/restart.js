const { PermissionFlagsBits, Client, ChatInputCommandInteraction } = require("discord.js")
const epic = require("../../epic")

module.exports = {
  name: "restart",
  description: "restarts bot.",
  default_permission: true,
  category: "whitelist",
  userPerms: [PermissionFlagsBits.SendMessages],
  ownerOnly: true,
  options: [],
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {*} args 
   */
  run: async (client, interaction, args) => {
    await interaction.reply(`restarting ${epic.emojis.hehe}`)
    process.exit()
  }
}
