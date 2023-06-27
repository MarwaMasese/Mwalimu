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

module.exports = mongoose.model('Student', studentSchema)