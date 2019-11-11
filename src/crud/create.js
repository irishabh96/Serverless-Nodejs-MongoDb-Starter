const { createErrorResponse, dbConnectAndExecute, mongoString } = require('../db')

const UserModel = require('../../models/User.js')

module.exports.createUser = (event, context, callback) => {
  const data = JSON.parse(event.body)

  const user = new UserModel({
    name: data.name,
    email: data.email,
    username: data.username
  })

  if (user.validateSync()) {
    callback(null, createErrorResponse(400, 'Incorrect user data'))
    return
  }

  dbConnectAndExecute(mongoString, () =>
    user
      .save()
      .then(() =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        })
      )
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  )
}
