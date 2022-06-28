let handler = async (m, { conn }) => {
     conn.reply(m.chat, `Bot ini menggunakan script HAYOLO MAU NGAPAIN OM?`, m)
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sc(ript(bot)?)?|sourcecode)$/i

module.exports = handler


