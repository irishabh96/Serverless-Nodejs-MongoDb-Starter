const mongoose = require('mongoose')

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('users', UserSchema)
