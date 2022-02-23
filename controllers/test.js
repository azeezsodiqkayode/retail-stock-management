require('dotenv').config()
const Joi = require('Joi')
const testmodel = require('../models/test')

const createNewRetailUser = (req, res) => {
    
    const retailUserSchema = Joi.object({
        
        fullName: Joi.string().required(),
        Email: Joi.string().required(),
        Admin_ID: Joi.string().required(),
        Password: Joi.string().required(),
        IsAdmin: Joi.string().required(),
         
    })
  
    const validateRetailAdmin = retailUserSchema.validate(req.body)
        if(validateRetailAdmin.error){
            res.status(422).send({
            status: false,
            message: "Bad Request"
        })
        }
     
    const { fullName, email, Admin_id, password, IsAdmin } = req.body

    testmodel.checkNewRetaiUser(email)
    .then(testmodelAdminExist => {
      if (testmodelAdminExist ==""){
          throw new Error("Account already exist")
       }
      return testmodel.newRetaiUser(fullName, email, Admin_id, password, IsAdmin)
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

const rethailLogin = (req, res) => {
    const { email, password } = req.body   

    if (!email || !password) {
        res.status(422).send({
            status: "sucess",
            message: 'user login Invalid',
            data: []
        })
    }

    if (email == email && password == Password) {
        next()
  
      } else {
          res.status(401).send({
              status: "sucess",
              message: 'Unauthorized Acesss',
              data: []
              
          
          })
      }
  
} 

 

module.exports = {
    createNewRetailUser,
    rethailLogin
}




