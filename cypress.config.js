const { defineConfig } = require('cypress')

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  e2e: {
    // Puedes agregar lógica para configurar eventos de nodo si es necesario
    setupNodeEvents(on, config) {
      // implementa eventos de nodo aquí si es necesario
    },
    baseUrl: 'http://localhost:3000',
    env: {
      BACKEND: 'http://localhost:3001/api',
    },
  },
})
