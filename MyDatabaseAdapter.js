const { MongoClient } = require('mongodb')

// 数据库适配器接口
class DatabaseAdapter {
    async read (key) {
        throw new Error('read method not implemented')
    }

    async write (key, value) {
        throw new Error('write method not implemented')
    }

    async update (key, value) {
        throw new Error('update method not implemented')
    }
}

// MongoDB 数据库适配器实现
class MongoDBAdapter extends DatabaseAdapter {
    constructor(db, collectionName) {
        super()
        this.db = db
        this.collectionName = collectionName
    }

    async read (key) {
        const collection = this.db.collection(this.collectionName)
        return collection.findOne({ _id: key })
    }

    async write (key, value) {
        const collection = this.db.collection(this.collectionName)
        await collection.insertOne({ _id: key, value: value })
    }

    async update (key, value) {
        const collection = this.db.collection(this.collectionName)
        await collection.updateOne({ _id: key }, { $set: { value: value } })
    }
}

// (async () => {
//     const client = new MongoClient('your-mongodb-connection-string')
//     try {
//         await client.connect()
//         const db = client.db('your-database-name')
//         const adapter = new MongoDBAdapter(db, 'your-collection-name')

//         // 以下是如何使用适配器的示例
//         await adapter.write('key1', { field: 'value1' })
//         console.log('Written key1')

//         const value = await adapter.read('key1')
//         console.log('Read key1:', value)

//         await adapter.update('key1', { field: 'updatedValue' })
//         console.log('Updated key1')

//         // ... 更多操作 ...
//     } finally {
//         await client.close()
//     }
// })()
export { DatabaseAdapter, MongoDBAdapter as MyDatabaseAdapter }