const injectDevServer = require("@cypress/react/plugins/react-scripts")

module.exports = (on, config) => {
  injectDevServer(on, config)
  return config
}

module.exports = (on, config) => {
  require("cypress-fail-fast/plugin")(on, config);
  return config;
};