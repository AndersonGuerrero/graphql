'use strict'
require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const cors = require('cors')

const resolvers = require('./lib/resolvers')

const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'
const app = express()

// Definimos en esquema inicial
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({ typeDefs, resolvers })
// middleware para la validacion de CROS-ORIGIN
app.use(cors())

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
})
)

app.listen(port, () => {
  console.log('server in listener in port ' + port)
})
