import { ApiError } from "../utils/api.error.js";

export function validator(schema){
    return function(req, _res, next){
        const { error } = schema(req.body);
        if(error){
            next(new ApiError(error.details[0]?.message, 422));
        } 
        return next(); 
    }
}