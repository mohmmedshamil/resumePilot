import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
    email: { type: String, required: false, unique: true },
    otp: { type: String },
    otpExpiry: { type: Date },
}, { timestamps: true });

export default model('User', userSchema);
