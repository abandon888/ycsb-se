import { DatabaseAdapter, MyDatabaseAdapter } from './MyDatabaseAdapter'
import { WorkloadGenerator } from './WorkloadGenerator'
import { PerformanceEvaluator } from './PerformanceEvaluator'
import { MongoClient } from 'mongodb'
import { Workloads } from './Workloads' // 导入工作负载配置
const { MONGO_URI, DB_NAME, COLLECTION_NAME } = require('./config')


export async function main (event, context) {
    // 记录函数开始执行的时间
    const functionStartTime = Date.now()

    // 连接到MongoDB
    const client = new MongoClient(MONGO_URI)
    let dbConnectionTime

    try {
        // 记录开始尝试连接数据库的时间
        const dbConnectStartTime = Date.now()

        await client.connect()

        // 记录数据库连接成功的时间
        dbConnectionTime = Date.now() - dbConnectStartTime

        const db = client.db(DB_NAME)
        const adapter = new MyDatabaseAdapter(db, COLLECTION_NAME)

        const workloadConfig = Workloads[event.workloadType] || Workloads.A

        const generator = new WorkloadGenerator(workloadConfig, adapter)
        const evaluator = new PerformanceEvaluator()

        evaluator.startTest()
        await generator.generateLoad()
        evaluator.endTest()

        const report = evaluator.getPerformanceReport()

        // 记录函数执行结束的时间
        const functionEndTime = Date.now()
        const totalFunctionExecutionTime = functionEndTime - functionStartTime

        // 返回包含冷启动时间、数据库连接时间和总执行时间的测试报告
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
        await client.close()
    }
}

