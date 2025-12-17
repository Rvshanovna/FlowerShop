import Joi from "joi";
import { Genders } from "../enums/index.js";

class UserValidation {
    _phoneRegex = /^\+[1-9]\d{1,14}$/;
    _passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?':{}|<>]).{8,}$/;

    create(data){
        const schema = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().pattern(this._phoneRegex).required(),
            email: Joi.string().email().optional(),
            username: Joi.string().min(4).optional(),
            password: Joi.string().pattern(this._passwordRegex).required(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional()
        });
        return schema.validate(data, { abortEarly: false });
    }

    update(data){
        const schema = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().pattern(this._phoneRegex).optional(),
            email: Joi.string().email().optional(),
            username: Joi.string().min(4).optional(),
            password: Joi.string().pattern(this._passwordRegex).optional(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional(),
            isActive: Joi.boolean().optional()
        });
        return schema.validate(data, { abortEarly: false });
    }

    signin(data){
        const schema = Joi.object({
            phoneNumber: Joi.string().required(),
            password: Joi.string().required()
        });
        return schema.validate(data, { abortEarly: false });
    }
}

export default new UserValidation();
