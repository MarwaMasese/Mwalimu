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
  educationsystem: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  rate:{
    type: Number,
    required: true
  },
  // photo:{
  //   type: String,
  //   required: false
  // }
  // subjects:{
  //   type: Array,
  //   required: True
  // },

})

// static signup method (Done and Tested)
teacherSchema.statics.signup = async function(name, phone,email,educationsystem, password, rate) {

  // validation
  if (!name || !phone || !email || !educationsystem || !password ||!rate) {
    throw Error('All fields must be filled')
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

  const user = await this.create({name, phone,email,educationsystem, password: hash ,rate })

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