import TestEnvironment from 'jest-environment-node'

/**
 * Default Node.js environment
 * Adds shared test globals
 */
class NodeEnvironment extends TestEnvironment {
  async setup () {
    await super.setup()
  }
}

export default NodeEnvironment
