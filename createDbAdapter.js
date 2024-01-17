// createDatabaseAdapter.js
import { MongoClient } from 'mongodb'
import { MyDatabaseAdapter } from './MyDatabaseAdapter'

/**
 * 根据传入的数据库类型，从conf.json中读取数据库配置，并返回
 * @param dbType 数据库类型
 * @returns dbConfig 数据库配置
 */
function getDbConfig (dbType) {
  const conf = require('../conf.json')
  const dbConfig = conf[dbType]

  if (!dbConfig) {
    throw new Error(`Unsupported database type: ${dbType}`)
  }

  return dbConfig
}

async function createDatabaseAdapter (event) {
  const { dbType } = event
  let adapter, dbConnectionTime
  const dbConfig = getDbConfig(dbType)

  switch (dbType) {
    case 'mongodb':
      const mongoClient = new MongoClient(dbConfig.uri)
      const dbConnectStartTime = Date.now()
      await mongoClient.connect()
      dbConnectionTime = Date.now() - dbConnectStartTime

      const db = mongoClient.db(dbConfig.dbName)
      adapter = new MyDatabaseAdapter(db, dbConfig.collectionName)
      break
    // 其他数据库类型的处理逻辑
    case 'redis':
      // TODO
      break
    default:
      throw new Error(`Unsupported database type: ${dbType}`)
  }

  return {
    adapter,
    dbConnectionTime,
    closeConnection: () => mongoClient?.close()
  }
}

export { createDatabaseAdapter }