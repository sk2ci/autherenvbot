const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
const { Client, WebhookClient, EmbedBuilder, codeBlock, GuildMember } = require("discord.js");
const { userdb, servers } = require("../../index");
const { existsSync, readFileSync, writeFileSync } = require("fs");
const { inspect } = require("util");

module.exports = {
  name: 'ready',
  once: true,

  /**
   * @param {Client} client 
   */
  async execute(client) {

    let epic = require("../../epic")

    client.user.setPresence({ activities: [{ name: epic.durum, type: epic.type }], status: epic.status })
    setInterval(() => {
      client.user.setPresence({ activities: [{ name: epic.durum, type: epic.type }], status: epic.status })
    }, 3600000);

    if (epic.statuschannel.enabled) {
      if (epic.statuschannel.userhookurl) {
        const statushook = new WebhookClient({
          url: epic.statuschannel.userhookurl
        })
        setInterval(async () => {
          const data = await userdb.find()
          const embed = new EmbedBuilder()
            .setAuthor({
              name: "List of the users"
            })
            .addFields([
              {
                name: `${epic.emojis.dot} Total Users`,
                value: codeBlock(data.length.toString())
              },
              {
                name: "<:onlineusers:1078043288755515433>  Online Users",
                value: codeBlock(data.map(u => client.guilds.cache.find(g => g.members.cache.has(u.userId))?.members.cache.get(u.userId)?.presence?.status).filter(d => d !== "offline" && d !== undefined).length)
              },
              {
                name: "<:limitusers:1078725916630454272> Limited Users",
                value: codeBlock(data.filter(u => u.serverLimit).length.toString())
              }
            ])
          await statushook.send({
            embeds: [embed]
          });
        }, epic.statuschannel.interval)
      }
      if (epic.statuschannel.serverhookurl) {
        const statushook = new WebhookClient({
          url: epic.statuschannel.serverhookurl
        })
        setInterval(async () => {
          const data = await userdb.find()
          const serversData = data.reduce((acc, u) => {
            const c = acc.find((i) => i.s == u.serverId)
            if (c) {
              c.members++;
            }
            else {
              acc.push({
                s: u.serverId,
                name: client.guilds.cache.get(u.serverId)?.name ?? u.serverId,
                members: 1
              })
            }
            return acc
          }, []).sort((a, b) => b.members - a.members)
          const top = array_chunks(serversData, 24)[0]
          const embed = new EmbedBuilder()
            .setAuthor({
              name: "List of the servers"
            })
            .addFields([
              {
                name: `${epic.emojis.dot} Total Users`,
                value: codeBlock(data.length.toString())
              },
              ...top.map(c => {
                return {
                  name: `${client.emojis.cache.find(e => e.name == c.s)?.toString() ?? ":flag_white:"} ${(c.name ?? "Unknown ").substring(0, 20)}`,
                  value: codeBlock(c.members.toString()),
                  inline: true
                }
              })
            ])
            .setFooter({
              text: "F1N"
            })
          await statushook.send({
            embeds: [embed]
          });
        }, epic.statuschannel.interval)
      }
    }

    console.log(`[LOG] ${client.user.tag} is now online!\n[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers\n[LOG] Bot serving ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString()} users`);
  }
}
