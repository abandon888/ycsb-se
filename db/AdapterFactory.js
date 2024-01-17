import DatabaseAdapter from './DatabaseAdapter'
import MongoDBAdapter from './mongo/MongoDBAdapter'

// 根据传入的数据库类型，导出相应的适配器
/**
 * @param {string} type 数据库类型
 * @param {any} db 数据库实例
 * @param {string} collectionName 集合名称
 */
function createAdapter (type, db, collectionName) {
  switch (type) {
    case 'mongodb':
      return new MongoDBAdapter(db, collectionName)
    // 可以添加更多数据库类型的处理逻辑
    default:
      throw new Error(`Unknown database type: ${type}`)
  }
}

export { DatabaseAdapter, createAdapter as MyDatabaseAdapter }
