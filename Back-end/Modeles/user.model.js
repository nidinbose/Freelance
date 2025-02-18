import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
name:{type:String},
email:{type:String},
password:{type:String},
referredBy:{type:String},
subscription:{type:String},
role:{type:String},
otp:{type:String},
otpExpires: { type: Date },


})

export default mongoose.model.user || mongoose.model("users",userSchema)