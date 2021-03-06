const { UserSchema } = require('./User.schema');

const insertUser = userObj => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj).save().then(data => resolve(data)).catch(err => reject(err))
    })
}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        if(!email) return false;
        try {
            UserSchema.findOne({email}, (error, data) => {
                if(error){
                    resolve(error);
                }
                resolve(data);
            });
            
        } catch (error) {
            reject(error);
        }
        
    });
}

const storeUserRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                {_id},
                {$set: {"refreshJWT.token": token, "refreshJWT.addedAt": Date.now()}},
                {new: true}
            ).then(data => resolve(data))
            .catch(err => reject(err));
        } catch (error) {
            reject(error);
        }

    });
}

module.exports = {
    insertUser,
    getUserByEmail,
    storeUserRefreshJWT,
};