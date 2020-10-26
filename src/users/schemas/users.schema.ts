import {Schema, Document} from 'mongoose'

export interface User extends Document {
    email: string
    name?: string
    password?: string
}

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})