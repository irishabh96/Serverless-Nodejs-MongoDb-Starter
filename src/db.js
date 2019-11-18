const mongoose = require('mongoose')
const mongoUser = ''
const mongoPass = ''
const mongoCluster = ''

const mongoString = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCluster}.mongodb.net/test?retryWrites=true`

const connection = {}

module.exports = async () => {
  console.log('connection -', connection)

  if (connection.isConnected) {
    console.log('=> using existing database connection')
    return
  }

  console.log('=> using new database connection')

  await mongoose.connect(mongoString, {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0 // and MongoDB driver buffering
  })

  mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection has occured ' + err + ' error')
  })

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection is disconnected')
    process.exit(0)
  })

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection is disconnected due to application termination')
      process.exit(0)
    })
  })

  connection.isConnected = mongoose.connection.readyState
}
