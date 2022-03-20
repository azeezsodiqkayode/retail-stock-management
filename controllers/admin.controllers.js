require('dotenv').config()
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid') 
const bcrypt = require('bcrypt')
const {checkAdminUser, newAdminUser , getAdminByEmail} = require('../models/admin.models')
const { isEmpty, asyncErrorHandler } = require('../utils/utils')

const saltRounds = 15



const hashPassword = (password) => {

    return new Promise( (resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) =>{
            bcrypt.hash(password, salt, (err, hash) =>{
            if (err) {
            reject(err); 
            }
            resolve([salt, hash]);
        })
    })
        })
}

const createAdminUser = async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body

    const adminUserSchema = Joi.object({
        
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().alphanum().required(),
    
         
    })
  
    const validateAdminDetails = adminUserSchema.validate(req.body)
        if(validateAdminDetails.error){
            res.status(422).send({
            status: false,
            message: "Bad Request"
        })
        }
     
    
    const fullname = `${firstname} ${lastname}`
    const admin_id = uuidv4()
    
    try{
        const [err, checkIfAdminUserExist] =  await asyncErrorHandler(checkAdminUser(email, phone))
        if (err){
            throw new Error (err)
        }
        if (!isEmpty(checkIfAdminUserExist)){
            throw new Error ("Admin already exist")
        }
        const passwordHashed = await hashPassword(password)
       await newAdminUser(fullname, email, phone, passwordHashed[1], admin_id)

        res.status(200).send({
            status: true,
            message: "Admin successfully created"
        })
    }catch(e){

        res.status(400).send({
            status: false,
            message: e.message || "Can't create admin try again later"
        })
    }
    

}

module.exports = {
    hashPassword,
    createAdminUser
}
