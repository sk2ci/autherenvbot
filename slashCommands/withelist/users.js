const discord = require('discord.js')
const { userdb, stopList } = require("../../index");
const epic = require('../../epic');
const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
module.exports = {
  name: "users",
  description: "total users",
  default_permission: true,
  category: "whitelist",
  userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    const data = await userdb.find()
    const countries = data.reduce((acc,u) => {
      const c = acc.find((i) => i.c ==u.country)
      if (c) {
        c.members++;
      }
      else {
        acc.push({
          c:u.country,
          members:1
        })
      }
      return acc
    },[]).sort((a,b) => b.members-a.members)
    const top = array_chunks(countries,24)[0]
    interaction.reply({
      embeds: [new discord.EmbedBuilder()
        .setAuthor({
          name:"List of the users"
        })
        .addFields([
          {
            name:`${epic.emojis.users} Total Users`,
            value:discord.codeBlock(data.length.toString())
          },
          ...top.map(c => {
            const user = data.find(u => u.country == c.c)
            return {
              name:`:flag_${user.country_code ? user.country_code.toLowerCase() : "white"}: ${c.c}`,
              value:discord.codeBlock(c.members.toString()),
              inline:true
            }
          })
        ])
        .setFooter({
          text:"F1N"
        })
      ]
    })
    //:flag_tr: \`${datatr.length}\`
  }
}
