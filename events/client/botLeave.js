
const discord = require('discord.js');
const epic = require("../../epic")

module.exports = {
  name: 'guildDelete',

  async execute(guild, client) {
    if (!guild.name) return;
    const welcomer = new discord.WebhookClient({
      url: epic.webhooks.general
    })

    welcomer.send({ embeds: [new discord.EmbedBuilder().setTitle('Retard L bot left').setColor(discord.Colors.Red).setDescription(`• **ID
** \`${guild.id}\`\n• **Name** \`${guild.name}\`\n• **Bot** \`${client.user.username}\``)]})
  }
}