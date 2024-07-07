const discord = require("discord.js");
const epic = require("../../epic");
const {  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "links",
  description: "Shows links of bot",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  ownerOnly: false,

  run: async (client, interaction, args) => {





    let embed1 = new discord.EmbedBuilder()
      .setTitle(` `)
    .setColor(`#2F3136`)                           .setDescription(`**Oauth2 link:** https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D\n\`\`\`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D\`\`\`\n**Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${epic.client_id}&permissions=8&scope=bot%20applications.commands\n\`\`\`https://discord.com/api/oauth2/authorize?client_id=${epic.client_id}&permissions=8&scope=bot%20applications.commands\`\`\``)
  const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
         .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${epic.client_id}&permissions=8&scope=bot%20applications.commands`)
      .setLabel("Bot Invite"),
        new ButtonBuilder()
         .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${interaction.guild.id}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D`)
      .setLabel("Auth Link"),
     
      );   
        


     interaction.reply({ embeds: [embed1],
      components: [row]

    });
  }
}