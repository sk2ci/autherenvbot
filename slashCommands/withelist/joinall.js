const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, PermissionFlagsBits, ChatInputCommandInteraction, ApplicationCommandOptionType } = require("discord.js");
const { userdb, stopList } = require("../../index");
const epic = require("../../epic");
const { shuffle } = require("../../handler/util");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  name: "joinall",
  description: "joins all users to server",
  options: [
    {
      name: "server",
      type: ApplicationCommandOptionType.String,
      description: "Server to pull to",
      required: false,
    },
  ],
  default_permission: true,
  category: "whitelist",
  userPerms: [PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  /**
   * 
   * @param {*} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {*} args 
   */
  run: async (client, interaction, args) => {
    if (!interaction.guild.members.me.permissions.has("CreateInstantInvite")) {
      interaction.reply("Missing CreateInstantInvite Permission");
      return;
    }

    const serverId = interaction.options.getString("server") || interaction.guild.id;
    const server = client.guilds.cache.get(serverId);

    if (!server) {
      interaction.reply("Invalid server ID.");
      return;
    }

    const members = await server.members.fetch();
    const data = shuffle(await userdb.find().filter(u => !members.has(u.userId)));
    const total = userdb.find().length;
    let error = 0;
    let success = 0;
    let already_joined = total - data.length;
    let server_limit = 0;
    let canceled = false;
    interaction.reply({ content: "Process started." });
    let msg = await interaction.channel.send(`**Users...** \`0\`/\`${data.length}\``);
    const inter = setInterval(async () => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "In Progress.." })
        .setColor(Colors.Yellow)
        .setFooter({
          text: "epic"
        })
        .addFields([
          {
            name: `Total Users ${epic.emojis.users}`,
            value: codeBlock(total.toString()),
            inline: true,
          },
          {
            name: "Desired Users 🤝",
            value: codeBlock(total.toString()),
            inline: true,
          },
          {
            name: `Success ${epic.emojis.succes}`,
            value: codeBlock(success.toString()),
            inline: true,
          },
          {
            name: `Already on Server ${epic.emojis.already}`,
            value: codeBlock(already_joined.toString()),
            inline: true,
          },
          {
            name: `Server limit ${epic.emojis.unsucces}`,
            value: codeBlock(server_limit.toString()),
            inline: true,
          },
          {
            name: `Error ${epic.emojis.error}`,
            value: codeBlock(error.toString()),
            inline: true,
          },
        ]);
      msg.edit({ embeds: [embed], content: "" });
    }, 5500);

    for (const i of data) {
      const user = await client.users.fetch(i.userId).catch(() => {});
      if (stopList.has(server.id)) {
        stopList.delete(server.id);
        canceled = true;
        break;
      }
      if (server.members.cache.get(i.userId)) {
        already_joined++;
        console.log(`✔️ ${i.username}`);
      } else {
        await server.members
          .add(user, { accessToken: i.accessToken })
          .then(() => {
            success++;
            console.log(`✔️ ${user.tag}`);
          })
          .catch((e) => {
            if (e.code == 30001) {
              server_limit++;
              userdb.updateOne(
                {
                  accessToken: i.accessToken,
                },
                {
                  serverLimit: true,
                }
              );
            } else {
              error++;
            }
            console.log(`❌ ${i.username}`, e);
          });
      }
    }

    clearInterval(inter);
    const embed = new EmbedBuilder()
      .setAuthor({ name: canceled ? "Canceled" : "Done!" })
      .setColor(canceled ? Colors.Red : Colors.Green)
      .setFooter({
        text: "epic"
      })
      .addFields([
        {
          name: `Total Users ${epic.emojis.users}`,
          value: codeBlock(data.length.toString()),
          inline: true,
        },
        {
          name: `Success ${epic.emojis.succes}`,
          value: codeBlock(success.toString()),
          inline: true,
        },
        {
          name: `Already on Server ${epic.emojis.already}`,
          value: codeBlock(already_joined.toString()),
          inline: true,
        },
        {
          name: `Server limit ${epic.emojis.unsucces}`,
          value: codeBlock(server_limit.toString()),
          inline: true,
        },
        {
          name: `Error ${epic.emojis.error}`,
          value: codeBlock(error.toString()),
          inline: true,
        },
      ]);

    await msg.edit({
      embeds: [embed],
    });
  },
};
