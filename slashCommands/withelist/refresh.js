const discord = require('discord.js')
const fetch = require("node-fetch")
const epic = require('../../epic');
const { codeBlock } = require('discord.js');
const { userdb, stopList } = require("../../index");
const { shuffle } = require('../../handler/util');

module.exports = {
  name: "refresh",
  description: "DB refresh",
  default_permission: true,
  category: "whitelist",
  userPerms: [discord.PermissionFlagsBits.SendMessages],
  ownerOnly: true,

  run: async (client, interaction, args) => {

    const data = await userdb.find()
    var count = 0;
    let refreshed = 0;
    let deleted = 0;
    let error = 0;
    var permarr = shuffle(data)
    const message =await interaction.reply({embeds: [new discord.EmbedBuilder().setDescription(`**Token refresh in progress...**`)],fetchReply:true})
    var inter = setInterval(async () => {
      const embed = new discord.EmbedBuilder().setAuthor({name:"In Progress.."})
      .setColor(discord.Colors.Yellow)
      .setFooter({
        text:"F1N"
      })
      .addFields([
        {
          name: `Total Users ${epic.emojis.users}`,
          value: codeBlock(array_of_members.length.toString()),
          inline: true,
        },
        {
          name:"\u200B",
          value:"\u200B",
          inline:true
        },
        {
          name:`Refreshed Users ${epic.emojis.succes}`,
          value:codeBlock(refreshed.toString()),
          inline: true
        },
        {
          name:`Deleted ${epic.emojis.unsucces}`,
          value:codeBlock(deleted.toString()),
          inline:true
        },
        {
          name:`Error ${epic.emojis.error}`,
          value:codeBlock(error.toString()),
          inline:true
        }
      ]);
      message.edit({
        embeds:[embed]
      })
    }, 5500)
    const array_of_members = permarr
    console.log(array_of_members.length)
    for (let i = 0; i < permarr.length; i++) {
      try {
        console.log(i)
        const refresh_token = array_of_members[i].refreshToken;

        const body = new URLSearchParams({
          client_id: epic.client_id,
          client_secret: epic.client_secret,
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          redirect_uri: epic.redirect_uri,
          scope: "identify guilds.join"
        });

        const response = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST", body: body.toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          let { status } = response;
          if (status == 401) {
            await userdb.deleteOne({ refreshToken: refresh_token });
            deleted++;
          }
          if (status == 429) {
            console.log("Ratelimited");
            console.log(parseInt(response.headers.get("retry-after")));
            await sleep(parseInt(response.headers.get("retry-after")+(Math.random()*30000)));
          }
          count++
          const data = await response.json().catch(e => {
            error++;
            console.log(e)
          })
          if(!data) {
            console.log("fuk u");
            error++;
            return
          }
          if(data.access_token) {
            const user_id = await requestId(data.access_token)
            await userdb.updateOne({ userId: user_id }, {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            })
            refreshed++;
          }
        }
        catch (e) {
          console.log(e)
          error++;
        }
    }
    await sleep(2000);
    clearInterval(inter)
    const embed = new discord.EmbedBuilder().setAuthor({name:"Done!"})
      .setColor(discord.Colors.Green)
      .setFooter({
        text:"F1N"
      })
      .addFields([
        {
          name: `Total Users ${epic.emojis.users}`,
          value: codeBlock(array_of_members.length.toString()),
          inline: true,
        },
        {
          name:"\u200B",
          value:"\u200B",
          inline:true
        },
        {
          name:`Refreshed Users ${epic.emojis.succes}`,
          value:codeBlock(refreshed.toString()),
          inline: true
        },
        {
          name:`Deleted ${epic.emojis.unsucces}`,
          value:codeBlock(deleted.toString()),
          inline:true
        },
        {
          name:`Error ${epic.emojis.error}`,
          value:codeBlock(error.toString()),
          inline:true
        }
      ]);
    message.edit({
        embeds: [embed],
        content:""
    });
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
 async function requestId(access_token) {
  const fetched = await fetch("https://discord.com/api/users/@me", {
      headers: {
          Authorization: `Bearer ${access_token}`,
      },
  });
  const json = await fetched.json();
  return json.id;
}