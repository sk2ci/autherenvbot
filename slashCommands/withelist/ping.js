const Discord = require("discord.js");
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "ping",
  description: "shows the bot Latency. ",
  default_permission: false,
  timeout: 3000,
  category: "whitelist",
userPerms: [Discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const embed = new Discord.EmbedBuilder()
    .setTitle(` `)
.setDescription(`Api Latency is ${client.ws.ping}ms\nMessege latency ${Date.now() - interaction.createdTimestamp}ms`)
    .setColor(`#2F3136`)
      .setFooter({ text: ` `})
    await interaction.reply({embeds: [embed]})
  }
}