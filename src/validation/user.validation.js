import Joi from "joi";
import { Genders } from "../enums/index.js";

const _phoneRegex = /^\+[1-9]\d{1,14}$/;
const _passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?':{}|<>]).{8,}$/;

class UserValidation {
    create(data){
        const user = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().pattern(_phoneRegex).optional(),
            email: Joi.string().email().optional(),
            username: Joi.string().min(4).optional(),
            password: Joi.string().pattern(_passwordRegex).required(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional()
        });

        return user.validate(data, { abortEarly: false });
    }

    update(data){
        const user = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().pattern(_phoneRegex).required(),
            email: Joi.string().email().required(),
            username: Joi.string().min(4).optional(),
            password: Joi.string().pattern(_passwordRegex).optional(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional(),
            isActive: Joi.bool().optional()
        });

        return user.validate(data, { abortEarly: false });
    }

    signin(data){
        const user = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        return user.validate(data, { abortEarly: false });
    }

    confirmOTP(data){
        const user = Joi.object({
            email: Joi.string().required(),
            otp: Joi.string().required()
        });

        return user.validate(data, { abortEarly: false });
    }

    updatePassword(data){
    const user = Joi.object({
        oldPassword: Joi.string().optional(),
        newPassword: Joi.string().pattern(_passwordRegex).required() 
    });
    return user.validate(data, { abortEarly: false });
}
}

export default new UserValidation();
