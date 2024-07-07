const discord = require('discord.js')

const epic = require("../../epic")
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "giveaway",
  description: "Verify giveaway",
  default_permission: true,
  options: [
    {
      name: 'duration',
      description: 'How long the giveaway should last for. Example values: 1, 10 ,100',
      type: ApplicationCommandOptionType.Integer,
      required: true
    },
    {
      name: 'winners',
      description: 'How many winners the giveaway should have',
      type: ApplicationCommandOptionType.Integer,
      required: true
    },
    {
      name: 'prize',
      description: 'What the prize of the giveaway should be',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'requiremnets',
      description: 'What the requiremnets of the giveaway should be',
     type: ApplicationCommandOptionType.String,
      required: true
    },
    ],
  category: "whitelist",
userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`Enter`)
      .setStyle(ButtonStyle.Link)
     .setURL(`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`)
        )
          
    const duration = interaction.options.getInteger('duration');
    const winners = interaction.options.getInteger('winners');
    const prize = interaction.options.getString('prize');
    const requiremnets = interaction.options.getString('requiremnets');
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({content: `Giveaway for ${prize} has been made! :gift:`, embeds: [new discord.EmbedBuilder().setTitle(`🎉 **Giveaway** 🎉`).setColor("2F3136").setDescription(`\n:gift: **WINNERS:** \`${winners}\`\n:tada: **TIMER**: \`${duration}h\`\n:gift: **PRIZE:** \`${prize}\`\n:tada: **HOSTED BY: ${interaction.user}**\n\n:link: __**Requirements:**__\n:link: **${requiremnets}**\n\nTo enter the giveaway click on the enter button.`)], components: [row]})


    
  }
}
