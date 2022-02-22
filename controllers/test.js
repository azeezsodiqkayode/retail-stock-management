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

        testmodel.newRetaiUser(fullName, email, Admin_id, password, IsAdmin)

    .then(testmodel => {
        res.status(400).send({
            staus: true,
            message: "Admin is successfully created",
            data: []
        })
    })

    .catch(err => {
        res.status(200).send({
            status: false,
            message: "Kindly try again later , This is on us",
            response: []
         })
    })

}





module.exports = {
    createNewRetailUser
}




