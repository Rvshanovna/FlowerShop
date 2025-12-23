import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/api.error.js";

export const roleGuard = (...roles) => {
    return catchAsync(async(req, _res, next) => {
        if(roles.includes('ID') && req.user?.id === req.params.id){
            return next();
        }
        if(!roles.includes(req.user?.role)){
            throw new ApiError('Forbidden user', 403);
        }
        return next();
    });
}