const { createErrorResponse, dbConnectAndExecute, mongoString } = require('../db')

const UserModel = require('../../models/User.js')

module.exports.updateUser = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const { update } = data

  dbConnectAndExecute(mongoString, () =>
    UserModel.findByIdAndUpdate(data.id, update)
      .then(() =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ success: true })
        })
      )
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  )
}
