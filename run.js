const MongoClient = require('mongodb').MongoClient

// 库名称和集合名称。需要提前创建。
const demoDb = "test"
const demoColl = "testColl"


// 建议使用副本集高可用地址，确保高可用。
// 确保执行代码的服务器和MongoDB实例网络是连通的。
// 如果密码中包含特殊字符，请进行转义处理。



// 转义函数
function escapeSpecialCharacters (password) {
  // Object mapping special characters to their escape sequences
  const escapeDict = {
    '!': '%21',
    '@': '%40',
    '#': '%23',
    '$': '%24',
    '%': '%25',
    '^': '%5e',
    '&': '%26',
    '*': '%2a',
    '(': '%28',
    ')': '%29',
    '_': '%5f',
    '+': '%2b',
    '=': '%3d'
  }

  // Replace each special character with its escape sequence
  return password.split('').map(char => escapeDict[char] || char).join('')
}
const newpassword = escapeSpecialCharacters("")//自行填写密码
const url = `mongodb://root:${newpassword}@dds-bp13f170d6cf5ee41543-pub.mongodb.rds.aliyuncs.com:3717,dds-bp13f170d6cf5ee42238-pub.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-74865747`
console.info("url:", url)

// 获取mongoClient。
const client = new MongoClient(url)

async function run () {
  try {
    //连接实例。
    await client.connect()

    //取得数据库句柄。
    const database = client.db(demoDb)

    //取得集合句柄。
    const collection = database.collection(demoColl)

    //组装记录。
    const demoName = "Node For Demo"
    const doc = { "DEMO": demoName, "MESG": "Hello AliCoudDB For MongoDB" }
    console.info("ready insert document: ", doc)

    //插入一条记录。
    const result = await collection.insertOne(doc)
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    )

    //读取数据。
    const filter = { "DEMO": demoName }
    const findResult = await collection.find(filter)
    await findResult.forEach(console.dir)
  } finally {
    //关闭连接。
    await client.close()
  }
}
run().catch(console.dir)
