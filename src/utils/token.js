import jwt from 'jsonwebtoken';
import { envConfig } from '../config/index.js';

class Token {
    getAccess(payload){
        const accessToken = jwt.sign(payload, envConfig.TOKEN.ACCESS_KEY, {
            expiresIn: envConfig.TOKEN.ACCESS_TIME
        });
        return accessToken;
    }

    getRefresh(payload, res){
        const refreshToken = jwt.sign(payload, envConfig.TOKEN.REFRESH_KEY, {
            expiresIn: envConfig.TOKEN.REFRESH_TIME
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 *  1000
        })
        return refreshToken;
    }
}


export default new Token();