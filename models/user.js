const mongoose = require("mongoose")
const { validate, Test } = require("validator-dutch")
const jwt = require("jsonwebtoken")
const config = require("../config/configVars")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    process.env.JWT_SECRET,
    { expiresIn: config.jwtExp }
  )
  return token
}

const User = mongoose.model("User", userSchema)

const validateUser = user => {
  const tests = {
    name: Test().fullName(),
    email: Test().email(),
    isAdmin: Test()
      .isBoolean()
      .optional(),
    password: Test().minLength(8),
    password2: Test().shouldEqual(
      "password",
      "De wachtwoorden komen niet overeen"
    )
  }
  return validate(user, tests)
}

exports.User = User
exports.validate = validateUser
