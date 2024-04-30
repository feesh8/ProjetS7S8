const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://discord.com',
    experimentalStudio: true,
    chromeWebSecurity: false,
  },
})

