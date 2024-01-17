const DatabaseAdapter = require('./DatabaseAdapter')
const MongoDBAdapter = require('./mongodb/MongoDBAdapter')
const RedisAdapter = require('./redis/RedisAdapter')
const CassandraAdapter = require('./cassandra/CassandraAdapter')

/**
 * 根据数据库类型创建并返回相应的数据库适配器实例。
 * 
 * @param {string} type 数据库类型 ('mongodb', 'redis', 'cassandra'等)
 * @param {...any} args 传递给适配器构造函数的参数
 * 
 * 对于不同的数据库类型，args 参数应该如下：
 * - MongoDB: (db, collectionName)
 *   - db: MongoDB的数据库实例
 *   - collectionName: MongoDB中要操作的集合名称
 * 
 * - Redis: (client)
 *   - client: Redis的客户端实例
 * 
 * - Cassandra: (client, keyspace, table)
 *   - client: Cassandra的客户端实例
 *   - keyspace: Cassandra中使用的keyspace名称
 *   - table: Cassandra中要操作的表名称
 * 
 * @returns {DatabaseAdapter} 返回对应类型的数据库适配器实例
 */
function createAdapter (type, ...args) {
  switch (type) {
    case 'mongodb':
      return new MongoDBAdapter(...args)
    case 'redis':
      return new RedisAdapter(...args)
    case 'cassandra':
      return new CassandraAdapter(...args)
    default:
      throw new Error(`Unknown database type: ${type}`)
  }
}

export { DatabaseAdapter, createAdapter as MyDatabaseAdapter }
