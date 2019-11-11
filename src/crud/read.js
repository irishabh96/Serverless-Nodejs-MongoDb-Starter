const { createErrorResponse, dbConnectAndExecute, mongoString } = require('../db')

const UserModel = require('../../models/User.js')

module.exports.getUsers = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () =>
    UserModel.find()
      .then(user =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        })
      )
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  )
}
