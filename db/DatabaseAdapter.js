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

export default DatabaseAdapter
