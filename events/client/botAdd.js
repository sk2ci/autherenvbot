
const discord = require('discord.js');
const epic = require("../../epic")
module.exports = {
  name: 'guildCreate',

  async execute(guild, client) {
    if (!guild.name) return;
    const owner = await guild.fetchOwner()


    let inv = await guild.channels.cache.filter(w => w.type === discord.ChannelType.GuildText).map(x => x)[0].createInvite({
      maxAge: 0,
      maxUses: 0
    }).catch(e => console.log(e))


    const welcomer = new discord.WebhookClient({
      url: epic.webhooks.general
    })

    welcomer.send({ embeds: [new discord.EmbedBuilder().setTitle('New  Server sped').setColor(discord.Colors.Green).setDescription(`• **ID ** \`${guild.id}\`\n• **Name** \`${guild.name}\`\n• **Members** \`${guild.memberCount}\`\n• **Owner** \`${owner.user.tag}\`\n• **Bot** \`${client.user.username}\`\n• **Server** [Invite](${inv.url})`)] })
  }
}