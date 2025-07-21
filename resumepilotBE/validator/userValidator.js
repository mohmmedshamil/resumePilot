import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const JoiObjectIdExtension = JoiObjectId(Joi);

export const userSignupSchema = Joi.object({
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
    }),
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
});

export const forgotPasswordSchema = Joi.object({
    phone: Joi.string().pattern(/^\d{7,10}$/).required().messages({
        'string.pattern.base': 'Phone number must contain 7 to 10 digits',
    }),
    countryCode: Joi.string().pattern(/^\+\d{1,3}$/).required().messages({
        'string.pattern.base': 'Country code must be in the format "+XXX"',
    }),
    email: Joi.string().email().optional(),
});

export const resetPasswordSchema = Joi.object({
    phone: Joi.string().pattern(/^\d{7,10}$/).required().messages({
        'string.pattern.base': 'Phone number must contain 7 to 10 digits',
    }),
    countryCode: Joi.string().pattern(/^\+\d{1,3}$/).required().messages({
        'string.pattern.base': 'Country code must be in the format "+XXX"',
    }),
    otp: Joi.string().length(6).required().messages({
        'string.length': 'OTP must be exactly 6 digits',
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.min': 'New password must be at least 6 characters long',
    }),
});

// Login Schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

// Cart Schema
export const cartSchema = Joi.object({
    productId: Joi.string().required().messages({
        'any.required': 'Product ID is required',
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required',
    }),
});

// Update Profile Schema
export const updateProfileSchema = Joi.object({
     userId: JoiObjectIdExtension().optional().messages({
        'string.base': 'User ID must be a valid ObjectId',
     }),// Updated address validation in userSignupSchema and updateProfileSchema   
    email: Joi.string().email().optional().messages({
        'string.email': 'Invalid email format',
    }),
    name: Joi.string().min(2).max(30).optional().messages({
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 30 characters',
    }),
});