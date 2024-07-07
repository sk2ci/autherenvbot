const discord = require('discord.js')
const { admins } = require('../../index')
const epic = require("../../epic")
module.exports = {
  name: "wl",
  description: "Whitelist",
  default_permission: true,
  options: [{
    name: 'add',
    description: "Whitelist add.",
    type: 1,
    options: [{
      name: 'user',
      description: "user to add",
      type: discord.ApplicationCommandOptionType.User,
      required: true
    }]
  }, {
    name: 'remove',
    description: "Whitelist remove.",
    type: 1,
    options: [{
      name: "user",
      description: 'user to remove',
      required: true,
      type: discord.ApplicationCommandOptionType.User,
    }]
  }, {
    name: 'list',
    description: "Whitelist list",
    type: 1,
  },
  ],
  category: "whitelist",
  userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: true,

  run: async (client, interaction, args) => {

    let subCommand = interaction.options.getSubcommand()

    if (subCommand === 'add') {
      const user = interaction.options.get("user").user
    
      let users = await admins.findOne({ userId: user.id })
      if(!users) {
        await admins.create({ userId: user.id })
        interaction.reply({embeds: [new discord.EmbedBuilder().setDescription(`**${client.users.resolve(user.id).tag}** added to the whitelist`)]})
      } else {
        interaction.reply({embeds: [new discord.EmbedBuilder().setDescription(`This user is already in whitelist !`).setColor(discord.Colors.Red)]})
      }
    } else if(subCommand === 'remove') {
      const user = interaction.options.get("user").user
    
      let users = await admins.findOne({ userId: user.id })
      if (!users) return interaction.reply({
        embeds: [new discord.EmbedBuilder()
          .setTitle("⛔ ǀ ERROR")
          .setDescription(`I couldnt add this user to the whitelist.`)
          .setFooter({
            text:"epic"
          })
        ]
      })
      await admins.deleteOne({ userId: user.id })
      return interaction.reply({
        embeds: [new discord.EmbedBuilder()
          .setDescription(`${client.users.resolve(user.id).tag} removed from whitelist.`)
          .setFooter({
            text:"epic"
          })
        ]
      })
    } else if(subCommand === 'list') {
      const total = await admins.find()

      var content = ""
      const blrank = total.filter((data) => data.userId).sort((a, b) => b.data - a.data);
      
      for(let i in blrank) {
        if(blrank[i].data === null) blrank[i].data = 0;
        content +=  `\`${blrank.indexOf(blrank[i]) + 1}\` ${client.users.resolve(blrank[i].userId)?.tag ?? "Bilmiyorum"} (\`${blrank[i].userId}\`)\n`
      }

      interaction.reply({embeds: [{
        title: `Whitelist Users ${epic.emojis.hehe}`,
        description: `${content}`,
        foother:"epic"
    }]})
    }
  }
}