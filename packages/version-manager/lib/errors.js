'use strict'

const createError = require('@fastify/error')

const ERROR_PREFIX = 'PLT_VERSION_MANAGER'

module.exports = {
  Error: createError(`${ERROR_PREFIX}_`, '')
}
