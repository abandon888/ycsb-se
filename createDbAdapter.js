// createDatabaseAdapter.js
const { MongoClient } = require('mongodb')
const { MyDatabaseAdapter } = require('./db/AdapterFactory')
/**
 * 根据传入的数据库类型，从环境变量中读取数据库配置，并返回
 * @param dbType 数据库类型
 * @returns dbConfig 数据库配置
 */
function getDbConfig (dbType) {
  let dbConfig

  switch (dbType) {
    case 'mongodb':
      dbConfig = {
        uri: process.env.MONGODB_URI,
        dbName: process.env.MONGODB_DB_NAME,
        collectionName: process.env.MONGODB_COLLECTION_NAME,
      }
      break
    // 其他数据库类型的环境变量配置
    default:
      throw new Error(`Unsupported database type: ${dbType}`)
  }

  if (!dbConfig.uri) {
    throw new Error(`Database configuration for ${dbType} is not properly set in environment variables.`)
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

module.exports = createDatabaseAdapter