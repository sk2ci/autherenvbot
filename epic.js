const { ActivityType, PresenceUpdateStatus } = require("discord.js");
module.exports = {
  client_id: "1110532016602091600", // client id ",
  client_secret: "lAizm_3fb8NsNzC4Kxfu8KCIItSSsgPm", // bot secret
  redirect_uri: "https://auth512.louayebdev.repl.co", //redirect url
  mainserver: "epic",
  footer: "Discord", //you can change it 
  support: "", //not required
  backupchannelid: "1111784103461797888", // channel for auth to backup to 
  statuschannel: {
    userhookurl: process.env.userhook, // new auth log
    serverhookurl: process.env.serverhook, //new server log
    enabled: false, //dum thing that spams ur webhook 
    interval: 6000 // intravel to spam thte user and server stats
  },
  emojis: {
    already: "❌",
    deleted: "❌",
    dot: "",
    error: "☢",
    limitusers: "🚫",
    msg: "⏰",
    onlineusers: "✅",
    progress: "",
    succes: "✅",
    unsucces: "❌",
    hehe: "🤼‍♂️",
    users: "🤼‍♂️",
  },
  owners: ["1101863259155484722","1042583676535443456","1111320216257962034","1113242009784823819"],//example for multiple ids ["owner_1_id", "owner_2_id"])
  token: process.env.token,
  webhooks: {
    general: process.env.general,
    join: process.env.join,
    //debug:""
  },
  durum: "free gifts",
  type: ActivityType.Playing,
  status: PresenceUpdateStatus.DoNotDisturb,
}
//nigga epic fr 
//i love daddy epic
//-louayebdev
//W - epic