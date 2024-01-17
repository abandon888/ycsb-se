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

export { DatabaseAdapter, MongoDBAdapter as MyDatabaseAdapter }