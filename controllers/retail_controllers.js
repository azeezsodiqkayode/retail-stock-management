require('dotenv').config()
const Joi = require('Joi')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid') 
const bcrypt = require('bcrypt')
const {checkNewRetaiUser, newRetaiUser, getAdminbyEmail} = require('../models/retail_model')
const { isEmpty } = require('../utils/retail_utils')

const saltRounds = 15


// const letHashRetailPassword = (password) => {

//    return new Promise((resolve, reject) =>{
//     bcrypt.genSalt(saltRounds, (err, salt) =>{
//         bcrypt.hash(password, salt, (err, hash) =>{
//             if( err){
//                 reject(err)
//             }
//                 resolve([salt, hash])
            
//         });
//     });
//    })
 const letHashRetailPassword = (password) => {

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

const createNewRetailUser = (req, res) => {
    
    const retailUserSchema = Joi.object({
        
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        admin_id: Joi.string().required(),
        password: Joi.string().required(),
        isAdmin: Joi.string().required(),
         
    })
  
    const validateRetailAdmin = retailUserSchema.validate(req.body)
        if(validateRetailAdmin.error){
            res.status(422).send({
            status: false,
            message: "Bad Request"
        })
        }
     
    const { fullName, email, admin_id, password, isAdmin } = req.body

    checkNewRetaiUser(email)
    .then(testmodelAdminExist => {
      if (testmodelAdminExist !=""){
          throw new Error("Account already exist")
       }

    return letHashRetailPassword(password)

     })
    .then(hashedPasswordFeedback =>{
        return newRetaiUser(fullName, email, admin_id, hashedPasswordFeedback[1], isAdmin)
    })
    .then(testmodel => {
        
            res.status(200).send({
                staus: true,
                message: `Admin created successfully`
            })
    })
    .catch(err => {
        res.status(200).send({
            status: false,
            message: err.message,
            response: []
         })
    })

}

const rethailLogin = async (req, res) => {
    const { email, password } = req.body   

        let payload 
    getAdminbyEmail(email)
    .then(outputAdminLogin => {
        if(isEmpty(outputAdminLogin)){
            throw new Error("Invalid credential supplied")
        }

        payload = outputAdminLogin[0]

        return bcrypt.compare(password, payload.password)

    })
    .then(nowComparePasswordFromLogin =>{
        if(nowComparePasswordFromLogin != true){
            throw new Error("You cannot login with this credential")
            
        }
        
        const addAminDetailToPayload = {
            email: payload.email,
            isAdmin: false,
            _id: uuidv4()
         }
         jwt.sign(addAminDetailToPayload, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_TIME },
          (err, token) => {
          if (err) {
              throw new Error("Credential not match")

          }

            res.setHeader('token', token).status(200).send({
                status: true,
                message: "Ogbeni Wagbayii joor Ori ee wanbe."
              })
        }
    )
    
}) 

.catch(err => {
        
    res.status(401).send({
        status: false,
        message: err.message,
        data: []
    })
}) 

}

module.exports = {
    letHashRetailPassword,
    createNewRetailUser,
    rethailLogin
}
