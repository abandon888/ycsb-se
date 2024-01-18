const createDatabaseAdapter = require('./createDbAdapter')
const { WorkloadGenerator } = require('./workloadGen')
const { PerformanceEvaluator } = require('./performance')
const Workloads = require('./workloadconf')

/**
 * 云函数入口函数
 * @param event 云函数调用参数
 *  - event.dbType 数据库类型
 *  - event.workloadType 负载类型
 * @returns {Promise<{coldStartDuration: string, dbConnectionTime: string, totalFunctionExecutionTime: string, performanceReport: *}>}
 */
async function main (events, context, callback) {
    let event = JSON.parse(events.toString())
    console.log(event)
    const functionStartTime = Date.now()
    const { adapter, dbConnectionTime, closeConnection } = await createDatabaseAdapter(event)
    try {

        const workloadConfig = Workloads[event.workloadType] || Workloads.A

        const generator = new WorkloadGenerator(workloadConfig, adapter)
        const evaluator = new PerformanceEvaluator()

        evaluator.startTest()
        await generator.generateLoad()
        evaluator.endTest()

        const report = evaluator.getPerformanceReport()

        const functionEndTime = Date.now()
        const totalFunctionExecutionTime = functionEndTime - functionStartTime

        callback(null,
            {
                coldStartDuration: `${functionStartTime - context.initialStartTime}ms`,
                dbConnectionTime: `${dbConnectionTime}ms`,
                totalFunctionExecutionTime: `${totalFunctionExecutionTime}ms`,
                performanceReport: report
            })

    } catch (error) {
        console.error('Error during database operation:', error)
        throw error
    } finally {
        await closeConnection()
    }
}

exports.main = main