const DatabaseAdapter = require('../DatabaseAdapter')

class RedisAdapter extends DatabaseAdapter {
  constructor(client) {
    super()
    this.client = client
  }

  async read (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err)
        else resolve(reply)
      })
    })
  }

  async write (key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) reject(err)
        else resolve(reply)
      })
    })
  }

  async update (key, value) {
    return this.write(key, value)
  }
}

module.exports = RedisAdapter
