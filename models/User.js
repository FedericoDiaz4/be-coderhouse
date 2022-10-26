import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
})

const User = mongoose.model('User', userSchema)
export default User