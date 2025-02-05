const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost27017/testemongodb2'

const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect()
    console.log('Conectando ao Mongodb!')
  } catch (err) {
    console.log(err)
  }
}

run()

module.exports = client
