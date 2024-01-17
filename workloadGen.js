// Import the MongoDBAdapter as DatabaseAdapter
const DatabaseAdapter = require('./MyDatabaseAdapter')

// WorkloadConfig interface
/**
 * @typedef {Object} WorkloadConfig
 * @property {number} readPercentage - Read percentage.
 * @property {number} writePercentage - Write percentage.
 * @property {number} totalOperations - Total number of operations.
 */

// WorkloadGenerator class
class WorkloadGenerator {
    /**
     * Create a WorkloadGenerator instance.
     * @param {WorkloadConfig} config - Workload configuration.
     * @param {DatabaseAdapter} adapter - Database adapter instance.
     */
    constructor(config, adapter) {
        this.config = config
        this.adapter = adapter
    }

    /**
     * Generate workload.
     */
    async generateLoad () {
        const { readPercentage, totalOperations } = this.config
        const reads = Math.floor(totalOperations * (readPercentage / 100))
        const writes = totalOperations - reads

        for (let i = 0; i < totalOperations; i++) {
            if (i < reads) {
                await this.performReadOperation(i)
            } else {
                await this.performWriteOperation(i)
            }
        }
    }

    /**
     * Perform a read operation.
     * @param {number} operationIndex - Operation index.
     */
    async performReadOperation (operationIndex) {
        const key = `key${operationIndex}`
        try {
            await this.adapter.read(key)
            console.log(`Read operation on ${key} successful.`)
        } catch (error) {
            console.error(`Error during read operation on ${key}:`, error)
        }
    }

    /**
     * Perform a write operation.
     * @param {number} operationIndex - Operation index.
     */
    async performWriteOperation (operationIndex) {
        const key = `key${operationIndex}`
        const value = `value${operationIndex}`
        try {
            await this.adapter.write(key, value)
            console.log(`Write operation on ${key} successful.`)
        } catch (error) {
            console.error(`Error during write operation on ${key}:`, error)
        }
    }
}

// Export WorkloadGenerator and WorkloadConfig for use in other modules
module.exports = { WorkloadGenerator }
