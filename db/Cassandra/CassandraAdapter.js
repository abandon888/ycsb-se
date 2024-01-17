import DatabaseAdapter from './DatabaseAdapter'

class CassandraAdapter extends DatabaseAdapter {
  constructor(client, keyspace, table) {
    super()
    this.client = client
    this.keyspace = keyspace
    this.table = table
  }

  async read (key) {
    const query = `SELECT * FROM ${this.keyspace}.${this.table} WHERE id = ?`
    return this.client.execute(query, [key], { prepare: true })
  }

  async write (key, value) {
    const query = `INSERT INTO ${this.keyspace}.${this.table} (id, value) VALUES (?, ?)`
    return this.client.execute(query, [key, value], { prepare: true })
  }

  async update (key, value) {
    const query = `UPDATE ${this.keyspace}.${this.table} SET value = ? WHERE id = ?`
    return this.client.execute(query, [value, key], { prepare: true })
  }
}

export default CassandraAdapter
