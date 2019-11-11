const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise

const mongoUser = '',
  mongoPass = '',
  mongoCluster = ''

const mongoString = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCluster}.mongodb.net/test?retryWrites=true` // MongoDB Url

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id'
})

const dbExecute = (db, fn) =>
  db.then(fn).finally(() => {
    mongoose.disconnect()
  })

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl), fn)
}

module.exports = {
  dbConnectAndExecute,
  createErrorResponse,
  mongoString
}
