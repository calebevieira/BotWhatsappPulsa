# 🤖 Pulsa WhatsApp Bot (Andamento)

Sistema de atendimento automatizado via WhatsApp para triagem de chamados no Grupo Pulsa.  
Desenvolvido com Electron + Baileys, com instalação desktop para Windows.

---

## 🚀 Funcionalidades

- Conecta ao WhatsApp via QR Code (sem precisar do celular depois da primeira vez)
- Atende usuários automaticamente com perguntas padronizadas
- Gera e atualiza planilha `chamados.csv` com os dados dos chamados
- Instala como app de desktop no Windows
- Interface simples com QR Code direto na tela
- Pronto para funcionar em múltiplas máquinas (ex: atendimento interno)

---

## 🛠️ Tecnologias

- [Electron](https://www.electronjs.org/) (App Desktop)
- [Baileys](https://github.com/WhiskeySockets/Baileys) (WhatsApp Web API)
- `csv-writer` (gravação da planilha)
- `qrcode` (exibição do QR Code)

---

## 🧩 Instalação para Desenvolvedores

```bash
# 1. Clonar o projeto
git clone https://github.com/seu-usuario/pulsa-whatsapp-bot.git
cd pulsa-whatsapp-bot

# 2. Instalar as dependências
npm install

# 3. Instalar o pacote de QR Code
npm install qrcode

# 4. Rodar o app para testes (com QR Code)
npm start

# 5. (opcional) Rodar apenas o bot via terminal
npm run bot
