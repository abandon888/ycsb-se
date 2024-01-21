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

    // 用于在测试开始前初始化数据库
    async init () {
        // 默认不需要实现
    }

    // 用于在测试结束后清理数据库
    async cleanup () {
        // 默认不需要实现
    }
}

module.exports = DatabaseAdapter
