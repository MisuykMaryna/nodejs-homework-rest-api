const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require('joi');

const emailRegexp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-z]+)$/;

const userSchema = new Schema({
password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: {
  type: String,
  avatarURL: String,
  required:true,
  }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}