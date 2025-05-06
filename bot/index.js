const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { BrowserWindow } = require('electron');

const programData = 'C:/ProgramData/PulsaBot';
if (!fs.existsSync(programData)) fs.mkdirSync(programData);

const csvWriter = createObjectCsvWriter({
  path: path.join(programData, 'chamados.csv'),
  header: [
    { id: 'data', title: 'Data' },
    { id: 'nome', title: 'Nome' },
    { id: 'hub', title: 'Hub' },
    { id: 'sistema', title: 'Sistema' },
    { id: 'assunto', title: 'Assunto' },
    { id: 'chamado', title: 'Chamado' },
    { id: 'whatsapp', title: 'WhatsApp' },
    { id: 'status', title: 'Status' }
  ],
  append: true
});

let estados = {};

async function iniciarBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    if (update.qr) {
      QRCode.toDataURL(update.qr, (err, url) => {
        const win = BrowserWindow.getAllWindows()[0];
        if (win) win.webContents.send('qr', url);
      });
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const texto = msg.message.conversation || '';

    if (!estados[sender]) {
      estados[sender] = { etapa: 1, dados: { whatsapp: sender } };
    }

    const user = estados[sender];
    switch (user.etapa) {
      case 1:
        user.dados.nome = texto;
        user.etapa++;
        await sock.sendMessage(sender, { text: 'De qual hub você é?' });
        break;
      case 2:
        user.dados.hub = texto;
        user.etapa++;
        await sock.sendMessage(sender, { text: 'Qual sistema está com problema?' });
        break;
      case 3:
        user.dados.sistema = texto;
        user.etapa++;
        await sock.sendMessage(sender, { text: 'Descreva o assunto.' });
        break;
      case 4:
        user.dados.assunto = texto;
        user.etapa++;
        await sock.sendMessage(sender, { text: 'Você já tem um chamado aberto? (Sim/Não)' });
        break;
      case 5:
        user.dados.chamado = texto;
        user.dados.data = new Date().toLocaleString('pt-BR');
        user.dados.status = 'Novo';
        await csvWriter.writeRecords([user.dados]);
        await sock.sendMessage(sender, { text: '✅ Chamado registrado com sucesso!' });
        delete estados[sender];
        break;
    }
  });
}

iniciarBot();