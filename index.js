const createDatabaseAdapter = require('./createDbAdapter')
const WorkloadGenerator = require('./WorkloadGenerator')
const PerformanceEvaluator = require('./PerformanceEvaluator')
const Workloads = require('./Workloads')

/**
 * 云函数入口函数
 * @param event 云函数调用参数
 *  - event.dbType 数据库类型
 *  - event.workloadType 负载类型
 * @returns {Promise<{coldStartDuration: string, dbConnectionTime: string, totalFunctionExecutionTime: string, performanceReport: *}>}
 */
async function main (event, context) {
    const functionStartTime = Date.now()

    try {
        const { adapter, dbConnectionTime, closeConnection } = await createDatabaseAdapter(event)
        const workloadConfig = Workloads[event.workloadType] || Workloads.A

        const generator = new WorkloadGenerator(workloadConfig, adapter)
        const evaluator = new PerformanceEvaluator()

        evaluator.startTest()
        await generator.generateLoad()
        evaluator.endTest()

        const report = evaluator.getPerformanceReport()

        const functionEndTime = Date.now()
        const totalFunctionExecutionTime = functionEndTime - functionStartTime

        return {
            coldStartDuration: `${functionStartTime - context.initialStartTime}ms`,
            dbConnectionTime: `${dbConnectionTime}ms`,
            totalFunctionExecutionTime: `${totalFunctionExecutionTime}ms`,
            performanceReport: report
        }
    } catch (error) {
        console.error('Error during database operation:', error)
        throw error
    } finally {
        await closeConnection()
    }
}

exports.main = main