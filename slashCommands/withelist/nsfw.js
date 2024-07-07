const discord = require('discord.js')

const epic = require("../../epic")
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "nsfw",
  description: "Verify nsfw",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
 userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {
  const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Im 18+`)
      .setStyle(ButtonStyle.Link)
     .setURL(`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`)
          )
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({embeds: [new discord.EmbedBuilder().setDescription(`Click the 'Im +18!' button to confirm that you are 18 years or older and that you consent to viewing sexually content. 🔞`)
.setColor("#808080")
.setImage("https://media.discordapp.net/attachments/1018183588090478632/1032253066629627934/4e25c6a7ac1fd3a31fd62594930536221cfd32f3-1.gif")], components: [row]}) 


    
  }
}