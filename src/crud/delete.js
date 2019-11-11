const { createErrorResponse, dbConnectAndExecute, mongoString } = require('../db')

const UserModel = require('../../models/User.js')

module.exports.updateUser = (event, context, callback) => {
  const data = JSON.parse(event.body)

  dbConnectAndExecute(mongoString, () =>
    UserModel.remove(data.id)
      .then(() =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ success: true })
        })
      )
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  )
}
