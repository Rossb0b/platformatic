'use strict'

const ConfigManager = require('@platformatic/config')
const { platformaticService, buildServer } = require('@platformatic/service')

const { schema } = require('./lib/schema')
const errors = require('./lib/errors')

async function platformaticVersionManager (app) {
  const configManager = app.platformatic.configManager
  const config = configManager.current

  // const {} = configManager.current.versionManager

  async function toLoad (app) {
    // app.register(openapi, config.versionManager)
  }

  toLoad[Symbol.for('skip-override')] = true
  await platformaticService(app, config, [toLoad])

  if (!app.hasRoute({ url: '/', method: 'GET' })) {
    app.register(require('./lib/root-endpoint'), config)
  }
}

platformaticVersionManager[Symbol.for('skip-override')] = true
platformaticVersionManager.schema = schema
platformaticVersionManager.configType = 'version-manager'
platformaticVersionManager.configManagerConfig = {
  schema,
  envWhitelist: ['PORT', 'HOSTNAME'],
  allowToWatch: ['.env'],
  schemaOptions: {
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    strict: false
  },
  transformConfig: platformaticService.configManagerConfig.transformConfig
}

async function buildVersionManagerServer (options) {
  return buildServer(options, platformaticVersionManager, ConfigManager)
}

module.exports = {
  schema,
  ConfigManager,
  platformaticVersionManager,
  buildServer: buildVersionManagerServer,
  errors
}
