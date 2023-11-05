#! /usr/bin/env node
'use strict'

const { metrics, server, plugins, watch, clients, openApiDefs } = require('@platformatic/service').schema
const telemetry = require('@platformatic/telemetry').schema
const pkg = require('../package.json')
const version = 'v' + pkg.version

const versionManager = {}

const platformaticVersionManagerSchema = {
  $id: `https://platformatic.dev/schemas/${version}/version-manager`,
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    server,
    versionManager,
    metrics,
    plugins,
    clients,
    telemetry,
    watch: {
      anyOf: [watch, {
        type: 'boolean'
      }, {
        type: 'string'
      }]
    },
    $schema: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['versionManager'],
  $defs: openApiDefs
}

module.exports.schema = platformaticVersionManagerSchema

/* c8 ignore next 3 */
if (require.main === module) {
  console.log(JSON.stringify(platformaticVersionManagerSchema, null, 2))
}
