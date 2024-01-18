// Description: Workload generator module.
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
     * Perform a read operation.
     * @param {number} operationIndex - Operation index.
     * @param {PerformanceEvaluator} evaluator - Performance evaluator instance.
     */
    async performReadOperation (operationIndex, evaluator) {
        const key = `key${operationIndex}`
        const start = Date.now()
        try {
            await this.adapter.read(key)
            const duration = Date.now() - start
            evaluator.recordOperation(true, duration)
            console.log(`Read operation on ${key} successful.`)
        } catch (error) {
            const duration = Date.now() - start
            evaluator.recordOperation(false, duration)
            console.error(`Error during read operation on ${key}:`, error)
        }
    }

    /**
     * Perform a write operation.
     * @param {number} operationIndex - Operation index.
     * @param {PerformanceEvaluator} evaluator - Performance evaluator instance.
     */
    async performWriteOperation (operationIndex, evaluator) {
        const key = `key${operationIndex}`
        const value = `value${operationIndex}`
        const start = Date.now()
        try {
            await this.adapter.write(key, value)
            const duration = Date.now() - start
            evaluator.recordOperation(true, duration)
            console.log(`Write operation on ${key} successful.`)
        } catch (error) {
            const duration = Date.now() - start
            evaluator.recordOperation(false, duration)
            console.error(`Error during write operation on ${key}:`, error)
        }
    }

    /**
     * Generate workload.
     */
    async generateLoad (evaluator) {
        const { readPercentage, totalOperations } = this.config
        const reads = Math.floor(totalOperations * (readPercentage / 100))
        const writes = totalOperations - reads

        for (let i = 0; i < totalOperations; i++) {
            if (i < reads) {
                await this.performReadOperation(i, evaluator)
            } else {
                await this.performWriteOperation(i, evaluator)
            }
        }
    }
}

// Export WorkloadGenerator and WorkloadConfig for use in other modules
module.exports = { WorkloadGenerator }
