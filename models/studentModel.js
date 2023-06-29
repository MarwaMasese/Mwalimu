const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    first_name:{
        type: String,
        required: true,
      },
      surname:{
        type: String,
        required: true,
      },
      phone:{
        type: String,
        required: true,
      },
      parent_phone:{
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      parent_email:{
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      education_system: {
        type: String,
        required: true
      },
      photo:{
        type: String,
        required: false
      }
}, { timestamps: true })

// static signup method
studentSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
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
  
    const user = await this.create({ email, password: hash })
  
    return user
  }
  
  // static login method
  studentSchema.statics.login = async function(email, password) {
  
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
  

module.exports = mongoose.model('Student', studentSchema)