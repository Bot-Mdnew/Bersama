//const { MessageType } = require("@adiwajshing/baileys")
let fetch = require('node-fetch')
async function handler(m, { command, usedPrefix }) {
    //if (!global.db.data.settings.anon) throw `Fitur ini tidak aktif`
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        //case 'next':
        //case 'skip':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) {
                await this.sendB(m.chat, '_Kamu tidak sedang berada di anonymous chat_', 'Mau cari patner chating?', null, [['Start', `${usedPrefix}start`]], m)
                throw false
            }
            this.sendB(m.chat, '_Kamu meninggalkan room anonymous chat_', 'Mau main anonymous lagi?', null, [['Ya', `${usedPrefix}start`], ['Tidak', `${usedPrefix}say Ok terimakasih telah menggunakan Anonymous Chat Bot, kalo kamu mau main lagi bisa klik button *Ya* di atas!`]], m)
            let other = room.other(m.sender)
            if (other) await this.sendB(other, '_Partner meninggalkan chat_', 'Mau cari patner chat lagi?', null, [['Start Again', `${usedPrefix}start`]], m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
                await this.sendB(m.chat, '_Kamu masih berada di dalam anonymous chat_', 'Mau keluar?', null, [['Leave', `${usedPrefix}leave`]], m)
                throw false
            }
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendB(room.a, '_Partner ditemukan!_', 'Silahkan chatingan🤗', null, [['Halo', '👋']], m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendB(room.b, '_Partner ditemukan!_', 'Silahkan chatingan🤗', null, [['Hai', '👋']], m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendB(m.chat, '_Menunggu partner..._', 'Kalo bosan menunggu, klik di bawah untuk keluar!', null, [['Leave', `${usedPrefix}leave`]], m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave']
handler.tags = ['anonymous']
handler.command = ['start', 'leave']//, 'next', 'skip']

handler.private = true

module.exports = handler
