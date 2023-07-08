const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const teacherSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmed_password: {
    type: String,
    required: true
  },
  // subjects:{
  //   type: Array,
  //   required: True
  // },
  education_system: {
    type: String,
    required: true
  },
  rate:{
    type: Number,
    required: true
  },
  photo:{
    type: String,
    required: false
  }

})

// static signup method
teacherSchema.statics.signup = async function(name, phone,email,education_system, password, rate, confirmed_password) {

  // validation
  if (!name || !phone || !email || ! education_system || !password ||!confirmed_password ||!rate) {
    throw Error('All fields must be filled')
  }
  if (password!=confirmed_password){
    throw Error('Passwords must match')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

// static login method
teacherSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('Teacher', teacherSchema)