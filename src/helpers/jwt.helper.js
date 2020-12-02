const jwt = require('jsonwebtoken');

const { getJWT, setJWT } = require('./redis.helper');
const { storeUserRefreshJWT } = require('../models/user/User.model');

const createAccessJWT = async (email, _id) => {
    try {
        const accessToken = jwt.sign({email}, process.env.JWT_ACCESS_KEY, {expiresIn: '15m'});
        await setJWT(accessToken, _id);
        return Promise.resolve(accessToken);
        
    } catch (error) {
        return Promise.reject(error);
    }
    
}

const createRefreshJWT = (email, _id) => {
    try {
        const refreshToken = jwt.sign({email}, process.env.JWT_REFRESH_KEY, {expiresIn: '365d'});
        const result = await storeUserRefreshJWT(_id, refreshToken);
        return Promise.resolve(refreshToken);
        
    } catch (error) {
        return Promise.reject(error);
    }
    
}

module.exports = {
    createAccessJWT,
    createRefreshJWT
}