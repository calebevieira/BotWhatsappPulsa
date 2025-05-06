module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "pulsa_whatsapp_bot",
        shortcutName: "Pulsa Bot",
        setupExe: "PulsaBotInstaller.exe"
      }
    }
  ]
};
