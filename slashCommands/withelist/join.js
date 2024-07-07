const { EmbedBuilder, codeBlock } = require("@discordjs/builders");
const { Colors, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { userdb, stopList } = require("../../index");
const epic = require("../../epic");
const { shuffle } = require("../../handler/util");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  name: "join",
  description: "joins amount to server",
  default_permission: true,
  options: [
    {
      name: "amount",
      type: ApplicationCommandOptionType.Integer,
      description: "amount of users to pull",
      required: true,
    },
    {
      name: "server",
      type: ApplicationCommandOptionType.String,
      description: "Server to pull to",
      required: false,
    },
  ],
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
    
    const amount = interaction.options.getInteger("amount");
    const serverId = interaction.options.getString("server") || interaction.guild.id;
    const server = client.guilds.cache.get(serverId);
    
    if (!server) {
      interaction.reply("Invalid server ID.");
      return;
    }

    const members = await server.members.fetch();
    const data = await userdb.find();
    let error = 0;
    let success = 0;
    let server_limit = 0;
    const array_of_members = shuffle(data.filter(u => !members.has(u.userId)));
    let already_joined = data.length - array_of_members.length;
    let canceled = false;
    const message = await interaction.reply({ content: "Starting...", fetchReply: true });
    var inter = setInterval(async () => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "In Progress.." })
        .setColor(Colors.Yellow)
        .addFields([
          {
            name: `Total Users ${epic.emojis.users}`,
            value: codeBlock(data.length.toString()),
            inline: true,
          },
          {
            name: "Desired Users 🤝",
            value: codeBlock(amount.toString()),
            inline: true
          },
          {
            name: `Success <:success:1072521724060512296> ${epic.emojis.succes}`,
            value: codeBlock(success.toString()),
            inline: true
          },
          {
            name: `Already on Server ${epic.emojis.already}`,
            value: codeBlock(already_joined.toString()),
            inline: true
          },
          {
            name: `Server limit ${epic.emojis.unsucces}`,
            value: codeBlock(server_limit.toString()),
            inline: true
          },
          {
            name: `Error ${epic.emojis.error}`,
            value: codeBlock(error.toString()),
            inline: true
          }
        ]);
      message.edit({ embeds: [embed], content: "" });
    }, 5500);

    for (let i = 0; success < parseInt(amount); i++) {
      if (stopList.has(server.id)) {
        stopList.delete(server.id);
        canceled = true;
        break;
      }
      if (!array_of_members[i]) {
        canceled = true;
        break;
      }
      const user = await client.users.fetch(array_of_members[i].userId).catch(() => {});
      if (server.members.cache.get(array_of_members[i].userId)) {
        already_joined++;
        console.log(`✔️ ${user.tag}`);
      } else {
        await server.members
          .add(user, { accessToken: array_of_members[i].accessToken })
          .then(() => {
            success++;
            console.log(`✔️ ${user.tag}`);
          })
          .catch((e) => {
            if (e.code == 30001) {
              server_limit++;
            } else {
              error++;
            }
            console.log(`❌ ${user.tag}`, e);
          });
      }
    }

    clearInterval(inter);
    const embed = new EmbedBuilder()
      .setAuthor({ name: canceled ? "Canceled" : "Done!" })
      .setColor(canceled ? Colors.Red : Colors.Green)
      .addFields([
        {
          name: `Total Users ${epic.emojis.users}`,
          value: codeBlock(data.length.toString()),
          inline: true,
        },
        {
          name: "Desired Users 🤝",
          value: codeBlock(amount.toString()),
          inline: true
        },
        {
          name: `Success ${epic.emojis.succes}`,
          value: codeBlock(success.toString()),
          inline: true
        },
        {
          name: `Already on Server ${epic.emojis.already}`,
          value: codeBlock(already_joined.toString()),
          inline: true
        },
        {
          name: `Server limit ${epic.emojis.unsucces}`,
          value: codeBlock(server_limit.toString()),
          inline: true
        },
        {
          name: `Error ${epic.emojis.error}`,
          value: codeBlock(error.toString()),
          inline: true
        }
      ]);

    message.edit({
      content: "",
      embeds: [embed],
    });
  },
};
