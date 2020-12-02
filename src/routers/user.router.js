const express = require('express');

const router = express.Router();
const { insertUser, getUserByEmail } = require('../models/user/User.model');

const { hashPassword, comparePassword } = require('../helpers/bcrypt.helper');

router.post('/', async (req, res) => {
    const { name, phone, address, email, password, company } = req.body;
    try {
        const hashedPass = await hashPassword(password);
        const newUser = {
            name, 
            phone, 
            address, 
            email, 
            password: hashedPass, 
            company
        };

        const result = await insertUser(newUser);

        res.json({message: 'Success', data: result});
        
    } catch (error) {
        console.log(error);
        res.json({message: 'Failed', error});        
    }
    
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.json({message: 'Login Failed, Email and Password not empty !'});
    }
    const user = await getUserByEmail(email);
    const userPassDB = user && user._id ? user.password : null;
    if(!userPassDB){
        return res.json({message:'Invalid Email or Password'});
    }

    const result = await comparePassword(password, userPassDB);

    return res.json({message: result ? 'Login Success' : 'Login Fail'});
});

module.exports = router;