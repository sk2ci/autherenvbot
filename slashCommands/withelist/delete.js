const { PermissionFlagsBits, Client, ChatInputCommandInteraction, EmbedBuilder, codeBlock, Colors } = require("discord.js")
const epic = require("../../epic")
const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
module.exports = {
    name: "massdelete",
    description: "deletes all bots messages.",
    default_permission: true,
    category: "whitelist",
    userPerms: [PermissionFlagsBits.SendMessages],
    ownerOnly: true,
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {*} args 
     */
    run: async (client, interaction, args) => {
        let msg = await interaction.reply({
            content: "Bıcı bıcı yapalım",
            fetchReply: true
        })
        let statuses = []
        let totalMessages = 0;
        let deletedMessages = 0;
        const inter = setInterval(async () => {
            const embed = new EmbedBuilder()
                .setTitle("Deleting...")
                .setColor(Colors.Yellow)
                .addFields([
                    {
                        name: `${epic.emojis.onlineusers} Total messages`,
                        value: codeBlock(totalMessages.toString())
                    },
                    {
                        name: `${epic.emojis.deleted} Deleted Messages`,
                        value: codeBlock(deletedMessages.toString())
                    },
                    {
                        name: "Status 1",
                        value: statuses[0]
                    },
                    {
                        name: "Status 2",
                        value: statuses[1]
                    }
                ])
            msg.edit({ embeds: [embed] }).catch(async () => {
                msg = await interaction.channel.send({ embeds: [embed] })
            })
        }, 5500)
        const guildChunks = array_chunks([...client.guilds.cache.values()], Math.ceil(client.guilds.cache.size / 2))
        await Promise.all(guildChunks.map(async (guilds, i) => {
            for (const guild of guilds) {
                const channels = await guild.channels.fetch()
                for (const channel of channels.values()) {
                    if (!channel.messages) continue
                    statuses[i] = `Fetching messages in #${channel.name} on ${guild.name}`
                    let messages = await channel.messages.fetch().catch(() => { })
                    if (!messages) continue
                    messages.filter(m => m.author.id == client.user.id).forEach(m => {
                        m.delete()
                        deletedMessages++;
                    })
                    console.log(messages.size);
                    totalMessages = totalMessages+messages.size
                    if (messages.size === 0) {
                        continue;
                    }
                    let a = true;
                    while (a) {
                        const newmessages = await channel.messages.fetch({ after: messages.firstKey() });
                        console.log(newmessages.size, messages.firstKey());
                        totalMessages = totalMessages+messages.size
                        if (newmessages.size === 0) {
                            a = false;
                        }
                        for (const message of newmessages.filter(m => m.author.id == client.user.id).values()) {
                            await message.delete()
                            deletedMessages++;
                        }
                        //@ts-expect-error
                        messages = messages.concat(newmessages);
                        messages = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp);
                        console.log(messages.size, messages.firstKey());
                        statuses[i] = `Fetching messages in #${channel.name} on ${guild.name} (${messages.size} Fetched)`
                    }
                }
            }
        }))
        clearInterval(inter)
        const embed = new EmbedBuilder()
            .setTitle("Deleted")
            .setColor(Colors.Green)
            .addFields([
                {
                    name: `${epic.emojis.onlineusers} Total messages`,
                    value: codeBlock(totalMessages.toString())
                },
                {
                    name: `${epic.emojis.deleted} Deleted Messages`,
                    value: codeBlock(deletedMessages.toString())
                },
                {
                    name: "Status 1",
                    value: statuses[0]
                },
                {
                    name: "Status 2",
                    value: statuses[1]
                }
            ])
        msg.edit({ embeds: [embed] }).catch(async () => {
            msg = await interaction.channel.send({ embeds: [embed] })
        })
    }
}
