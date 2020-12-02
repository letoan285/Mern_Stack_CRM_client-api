const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (password) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(password, saltRounds));
    });
}

const comparePassword = (pass, passFromDB) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, passFromDB, function(err, result){
            if(err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    hashPassword,
    comparePassword
}