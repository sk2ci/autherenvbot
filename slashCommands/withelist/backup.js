const discord = require('discord.js');
const epic = require("../../epic");
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "backup",
  description: "backup cmd",
  default_permission: true,
  category: "whitelist",
  userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {
   
    interaction.deferReply();
    interaction.deleteReply();

    const embed = new discord.EmbedBuilder()
      .setDescription(`In case our server gets banned and terminated verify so you will be transported to our next server [Click here to Verify!](${`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`}) button.`)
       .setColor("#000000")
        const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Click Here To Verify`)
      .setStyle(ButtonStyle.Link)
     .setURL(`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`)
          
      );

    

    interaction.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
}
