const { PermissionFlagsBits, ApplicationCommandOptionType, Client, ChatInputCommandInteraction } = require("discord.js")
const { userdb, stopList } = require("../../index");

module.exports = {
  name: "stop",
  description: "Stops auth.",
  default_permission: true,
  category: "whitelist",
  userPerms: [PermissionFlagsBits.SendMessages],
  ownerOnly: false,
  options: [
    {
      name: "id",
      type: ApplicationCommandOptionType.String,
      description: "Server id",
      required: true,
    },
  ],

  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {*} args 
   */
  run: async (client, interaction, args) => {
    await interaction.reply(`transaction canceled <:hehe:1079094323234218074>`)
    stopList.set(interaction.options.getString("id",false) ?? interaction.guildId,true)
  }
}
