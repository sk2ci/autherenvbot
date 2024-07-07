const { PermissionFlagsBits, EmbedBuilder, Client, ChatInputCommandInteraction, ActionRowBuilder, RoleSelectMenuBuilder, ButtonBuilder, ButtonStyle, DiscordAPIError, ComponentType, inlineCode, TextInputBuilder, TextInputStyle, ModalBuilder } = require("discord.js")
const { servers } = require("../../index")
const { encrypt } = require("../../handler/util")
const epic = require("../../epic")
const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
async function render(interaction,index) {
    const data = array_chunks(servers.find(),3)
    const embed = new EmbedBuilder()
    .setAuthor({
        name:"Authlink Servers",
        iconURL:interaction.guild.iconURL()
    })
    .addFields(await Promise.all(data[index]?.map(async server => {
        const guild = await interaction.client.guilds.fetch(server.serverid).catch(() => {})
        const role = await guild?.roles.fetch(server.roleid).catch(() => {})
        return {
            name:guild?.name ?? "Unkown Server",
            inline:true,
            value:`Status: ${!server ? `${epic.emojis.error} (Setup not Started)`:
            !guild ? `${epic.emojis.error} Bot is not on server` :
            !role   ? `${epic.emojis.error} (Role Not Selected)` :
            !role.editable ? `${epic.emojis.error} (Role is higher or bot has missing perms)` :
            role.managed  ? `${epic.emojis.error} (Role Is Managed By a integration` :
            `${epic.emojis.succes} Server is perfectly set up`}
Server ID: ${inlineCode(server.serverid)}
Role ID: ${inlineCode(server.roleid)}
Authlink: [Here](https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${server.serverid}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D)`
        }
        })).catch((e) => {console.log(e)}) ?? {
            name:"Empty",
            value:"No Servers"
        })
    const addBtn = new ButtonBuilder()
    .setCustomId("addServerBtn")
    .setLabel("Add Server")
    .setStyle(ButtonStyle.Success)
    const editBtn = new ButtonBuilder()
    .setLabel("Edit Server")
    .setCustomId("editServerBtn")
    .setStyle(ButtonStyle.Secondary)
    const removeBtn = new ButtonBuilder()
    .setCustomId("deleteServerBtn")
    .setLabel("Delete server")
    .setStyle(ButtonStyle.Danger)
    const naviFirstPage = new ButtonBuilder()
    .setCustomId("naviFirstPage")
    .setLabel("<--")
    .setDisabled(index < 2)
    .setStyle(ButtonStyle.Primary)
    const naviPrevPage = new ButtonBuilder()
    .setCustomId("naviPrevPage")
    .setLabel("<-")
    .setDisabled(index == 0)
    .setStyle(ButtonStyle.Primary)
    const naviMiddle = new ButtonBuilder()
    .setCustomId("naviMiddle")
    .setLabel(`${index+1}/${data.length}`)
    .setDisabled(true)
    .setStyle(ButtonStyle.Secondary)
    const naviNexPage = new ButtonBuilder()
    .setCustomId("NaviNextPage")
    .setDisabled(data.length-index <2)
    .setLabel("->")
    .setStyle(ButtonStyle.Primary)
    const naviLastPage = new ButtonBuilder()
    .setCustomId("NaviLastPage")
    .setDisabled(data.length == index+1)
    .setLabel("-->")
    .setStyle(ButtonStyle.Primary)
    const managementRow = new ActionRowBuilder()
    .addComponents(addBtn,editBtn,removeBtn)
    const naviRow = new ActionRowBuilder()
    .addComponents(naviFirstPage,naviPrevPage,naviMiddle,naviNexPage,naviLastPage)
    await interaction.update({
        embeds:[embed],
        components:[managementRow,naviRow],
        fetchReply:true,
    })
}
module.exports = {
  name: "server",
  description: "server manager",
  default_permission: true,
  category: "whitelist",
  userPerms: [PermissionFlagsBits.SendMessages],
  ownerOnly: true,
  /**
   * 
   * @param {Client} client 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {string[]} args 
   */
  run: async (client, interaction, args) => {
    const data = array_chunks(servers.find(),3)
    let index = 0;
    const embed = new EmbedBuilder()
    .setAuthor({
        name:"Authlink Servers",
        iconURL:interaction.guild.iconURL()
    })
    .addFields(await Promise.all(data[index]?.map(async server => {
        const guild = await client.guilds.fetch(server.serverid).catch(() => {})
        const role = await guild?.roles.fetch(server.roleid).catch(() => {})
        return {
            name:guild?.name ?? "Unkown Server",
            inline:true,
            value:`Status: ${!server ? `${epic.emojis.error} (Setup not Started)`:
            !guild ? `${epic.emojis.error} Bot is not on server` :
            !role   ? `${epic.emojis.error} (Role Not Selected)` :
            !role.editable ? `${epic.emojis.error} (Role is higher or bot has missing perms)` :
            role.managed  ? `${epic.emojis.error} (Role Is Managed By a integration` :
            `${epic.emojis.succes} Server is perfectly set up`}
Server ID: ${inlineCode(server.serverid)}
Role ID: ${inlineCode(server.roleid)}
Authlink: [Here](https://discord.com/oauth2/authorize?client_id=${epic.client_id}&redirect_uri=${epic.redirect_uri}&response_type=code&scope=identify%20guilds.join&state=%7B%22guild%22%3A%22${server.serverid}%22%2C%22bot%22%3A%22${epic.client_id}%22%7D)`
        }
        })).catch(() => {}) ?? {
            name:"Empty",
            value:"No Servers"
        })
    const addBtn = new ButtonBuilder()
    .setCustomId("addServerBtn")
    .setLabel("Add Server")
    .setStyle(ButtonStyle.Success)
    const editBtn = new ButtonBuilder()
    .setCustomId("editServerBtn")
    .setLabel("Edit server")
    .setStyle(ButtonStyle.Secondary)
    const removeBtn = new ButtonBuilder()
    .setCustomId("deleteServerBtn")
    .setLabel("Delete server")
    .setStyle(ButtonStyle.Danger)
    const naviFirstPage = new ButtonBuilder()
    .setCustomId("naviFirstPage")
    .setLabel("<--")
    .setDisabled(index < 2)
    .setStyle(ButtonStyle.Primary)
    const naviPrevPage = new ButtonBuilder()
    .setCustomId("naviPrevPage")
    .setLabel("<-")
    .setDisabled(index == 0)
    .setStyle(ButtonStyle.Primary)
    const naviMiddle = new ButtonBuilder()
    .setCustomId("naviMiddle")
    .setLabel(`${index+1}/${data.length}`)
    .setDisabled(true)
    .setStyle(ButtonStyle.Secondary)
    const naviNexPage = new ButtonBuilder()
    .setCustomId("NaviNextPage")
    .setDisabled(data.length-index <2)
    .setLabel("->")
    .setStyle(ButtonStyle.Primary)
    const naviLastPage = new ButtonBuilder()
    .setCustomId("NaviLastPage")
    .setDisabled(data.length==index+1)
    .setLabel("-->")
    .setStyle(ButtonStyle.Primary)
    const managementRow = new ActionRowBuilder()
    .addComponents(addBtn,editBtn,removeBtn)
    const naviRow = new ActionRowBuilder()
    .addComponents(naviFirstPage,naviPrevPage,naviMiddle,naviNexPage,naviLastPage)
    const reply = await interaction.reply({
        embeds:[embed],
        components:[managementRow,naviRow],
        fetchReply:true,
    })
    const collector = reply.createMessageComponentCollector({
        idle:120000,
        filter:i => i.user.id == interaction.user.id
    })
    collector.on("collect",async i => {
        if (!i.isButton()) return
        if (i.customId == "addServerBtn") {
            const serverIdInput = new TextInputBuilder()
            .setCustomId("serveridInput")
            .setLabel("Server id")
            .setStyle(TextInputStyle.Short)
            const roleidInput = new TextInputBuilder()
            .setCustomId("roleidInput")
            .setLabel("Rol id")
            .setStyle(TextInputStyle.Short)
            const row1 = new ActionRowBuilder()
            .addComponents(serverIdInput)
            const row2 = new ActionRowBuilder()
            .addComponents(roleidInput)
            const modal = new ModalBuilder()
            .addComponents(row1,row2)
            .setCustomId("bununieokuyonamk")
            .setTitle("Add Server")
            await i.showModal(modal)
            const submit = await i.awaitModalSubmit({
                time:120000
            }).catch(() => {})
            if (!submit) return;
            if (servers.findOne({serverid:submit.fields.getTextInputValue("serveridInput")})) return submit.reply("Server already exists")
            const server = await client.guilds.fetch(submit.fields.getTextInputValue("serveridInput")).catch(() => {})
            if (!server) return submit.reply("Server not found")
            if (!server.members.me.permissions.has("ManageRoles")) return submit.reply("Missing ManageRoles perm")
            const rol = await server.roles.fetch(submit.fields.getTextInputValue("roleidInput")).catch(() => {})
            if (!rol) return submit.reply("Role not found")
            if (!rol.editable) return submit.reply("Role is higher than me")
            if (rol.managed) return submit.reply("Role is managed")
            servers.create({
                serverid:server.id,
                roleid:rol.id
            })
            submit.reply("Created Server")
        }
        if (i.customId == "deleteServerBtn") {
            const serverIdInput = new TextInputBuilder()
            .setCustomId("serveridInput")
            .setLabel("Server id")
            .setStyle(TextInputStyle.Short)
            const row1 = new ActionRowBuilder()
            .addComponents(serverIdInput)
            const modal = new ModalBuilder()
            .addComponents(row1)
            .setCustomId("bununieokuyonamk")
            .setTitle("Remove Server")
            await i.showModal(modal)
            const submit = await i.awaitModalSubmit({
                time:120000
            }).catch(() => {})
            if (!submit) return;
            const server = servers.findOne({serverid:submit.fields.getTextInputValue("serveridInput")})
            if (!server) return submit.reply("Server not found")
            servers.deleteOne({serverid:submit.fields.getTextInputValue("serveridInput")})
            submit.reply("Deleted Server")
        }
        if (i.customId == "editServerBtn") {
            const serverIdInput = new TextInputBuilder()
            .setCustomId("serveridInput")
            .setLabel("Server id")
            .setStyle(TextInputStyle.Short)
            const roleidInput = new TextInputBuilder()
            .setCustomId("roleidInput")
            .setLabel("Rol id")
            .setStyle(TextInputStyle.Short)
            const row1 = new ActionRowBuilder()
            .addComponents(serverIdInput)
            const row2 = new ActionRowBuilder()
            .addComponents(roleidInput)
            const modal = new ModalBuilder()
            .addComponents(row1,row2)
            .setCustomId("bununieokuyonamk")
            .setTitle("Add Server")
            await i.showModal(modal)
            const submit = await i.awaitModalSubmit({
                time:120000
            }).catch(() => {})
            if (!submit) return;
            if (!servers.findOne({serverid:submit.fields.getTextInputValue("serveridInput")})) return submit.reply("Server not found in database")
            const server = await client.guilds.fetch(submit.fields.getTextInputValue("serveridInput")).catch(() => {})
            if (!server) return submit.reply("Server not found")
            if (!server.members.me.permissions.has("ManageRoles")) return submit.reply("Missing ManageRoles perm")
            const rol = await server.roles.fetch(submit.fields.getTextInputValue("roleidInput")).catch(() => {})
            if (!rol) return submit.reply("Role not found")
            if (!rol.editable) return submit.reply("Role is higher than me")
            if (rol.managed) return submit.reply("Role is managed")
            servers.updateOne({
                serverid:server.id,
            },{
                roleid:rol.id
            })
            submit.reply("Edited Server")
        }
        if (i.customId == "naviFirstPage") {
            index = 0;
            render(i,index)
        }
        if (i.customId == "naviPrevPage") {
            index--;
            render(i,index)
        }
        if (i.customId == "NaviNextPage") {
            index++;
            render(i,index)
        }
        if (i.customId == "NaviLastPage") {
            index = array_chunks(servers.find(),3).length-1
            render(i,index)
        }
    })
    collector.on("end",() => {
        reply.edit({
            components:[managementRow,naviRow].map(row => {
                return row.setComponents(row.components.map(com => com.setDisabled(true)))
            })
        })
    })
  }
}
