'use strict'
const { MongoClient } = require('mongodb')

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

// const mongourl =  `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
const mongourl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

let connection

async function connectDB () {
  if (connection) { return connection }

  let client
  try {
    client = await MongoClient.connect(mongourl, {
      useNewUrlParser: true
    })
    connection = client.db(DB_NAME)
    console.log('connected db')
  } catch (error) {
    console.error('Could not connect to db ', mongourl, error)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB
