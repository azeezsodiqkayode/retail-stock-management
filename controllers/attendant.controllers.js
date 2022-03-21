require('dotenv').config()
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid') 
const bcrypt = require('bcrypt')
const {newAttendantUser,checkAttendantUser, getAttendantByEmail} = require('../models/attendant.models')
const { isEmpty, asyncErrorHandler } = require('../utils/utils')
const {hashPassword} = require('../controllers/admin.controllers')
const saltRounds = 15




const createAttendantUser = async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body

    const attendantUserSchema = Joi.object({
        
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().alphanum().required(),
    
         
    })
  
    const validateAttendantDetails = attendantUserSchema.validate(req.body)
        if(validateAttendantDetails.error){
            res.status(422).send({
            status: false,
            message: "Bad Request"
        })
        }
     
    
    const fullname = `${firstname} ${lastname}`
    const attendant_id = uuidv4()
    
    try{
        const [err, checkIfAdminUserExist] =  await asyncErrorHandler(checkAttendantUser(email, phone))
        if (err){
            throw new Error (err)
        }
        if (!isEmpty(checkIfAdminUserExist)){
            throw new Error ("Admin already exist")
        }
        const passwordHashed = await hashPassword(password)
       await newAttendantUser(fullname, email, phone, passwordHashed[1], attendant_id)

        res.status(200).send({
            status: true,
            message: "Attendant successfully created"
        })
    }catch(e){

        res.status(400).send({
            status: false,
            message: e.message || "Can't create attendant try again later"
        })
    }
    

}

module.exports = {
    createAttendantUser
}
