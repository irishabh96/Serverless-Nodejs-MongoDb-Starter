const dbConnection = require('../db')

const UserModel = require('../../models/User.js')

module.exports.createUser = async event => {
  try {
    let data = JSON.parse(event.body)
    await dbConnection()

    let user = new UserModel({
      name: data.name,
      email: data.email,
      username: data.username
    })

    if (user.validateSync()) {
      throw new Error('Something Went Wrong!')
    }

    user = await user.save()

    return {
      statusCode: 200,
      body: JSON.stringify(user)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 400,
      body: JSON.stringify(err.message)
    }
  }
}

module.exports.getUsers = async event => {
  try {
    await dbConnection()
    let users = await UserModel.find()
    return {
      statusCode: 200,
      body: JSON.stringify(users)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message)
    }
  }
}

module.exports.deleteUser = async (event, context) => {
  try {
    const id = event.pathParameters.id
    console.log(id)

    await dbConnection()

    await UserModel.remove({ _id: id })

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message)
    }
  }
}

module.exports.updateUser = async (event, context, callback) => {
  try {
    let id = event.pathParameters.id

    const data = JSON.parse(event.body)

    const { update } = data

    await dbConnection()

    await UserModel.findByIdAndUpdate(id, update)

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message)
    }
  }
}
