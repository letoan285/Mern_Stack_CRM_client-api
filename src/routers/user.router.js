const express = require('express');

const router = express.Router();
const { insertUser } = require('../models/user/User.model');

const { hashPassword } = require('../helpers/bcrypt.helper');

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

module.exports = router;