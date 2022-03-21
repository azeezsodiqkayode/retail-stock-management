require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid') 
const { getAdminByEmail, forgetPasswordModel,
        validateHash, updateAdminPassword,
        deleteResetPasswordRecord } = require('../models/admin.models')
const {getAttendantByEmail} = require('../models/attendant.models')
const { isEmpty, asyncErrorHandler } = require('../utils/utils')
const { readFileAndSendEmail } =  require('../service/email.services')
const { hashPassword } =  require('../controllers/admin.controllers')




const adminLogin = async (req, res) => {
    const { email, password } = req.body

    let payload

    try{

        const [err, checkIfAdminUserExist] = await asyncErrorHandler(getAdminByEmail(email))

        if (err){
            throw new Error ("Internal Server Error")
        }
        if(isEmpty(checkIfAdminUserExist)){
            throw new Error ("Invalid Email/Password")
        }

        payload = checkIfAdminUserExist[0]

        const resultFromPasswordCompare = bcrypt.compare(password, payload.password)
        if (resultFromPasswordCompare == false) {
            throw new Error("Invalid Email or Password")
        }

        const dataToAddInMyPayload = {
            email: payload.email,
            _id: uuidv4(),
            firstname: payload.firstname,
            lastname:payload.lastname
            }
                jwt.sign(dataToAddInMyPayload, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_TIME },
                (err, token) => {
                    if (err) {
                        throw new Error("Something went wrong")
                    }
                 
                    res.setHeader('token', token).status(200).send({
                                status: true,
                                message: "Successfully logged in "
                   })
                   
                }
        

           )

    }catch(e){
        res.status(400).send({
            status: false,
            message: err.message || "Something went wrong"
        })
    }


}

const attendantLogin = async (req, res) => {
    const { email, password } = req.body

    let payload

    try{

        const [err, checkIfAttendantExist] = await asyncErrorHandler(getAttendantByEmail(email))

        if (err){
            throw new Error ("Internal Server Error")
        }
        if(isEmpty(checkIfAttendantExist)){
            throw new Error ("Invalid Email/Password")
        }

        payload = checkIfAttendantExist[0]

        const resultFromPasswordCompare = bcrypt.compare(password, payload.password)
        if (resultFromPasswordCompare == false) {
            throw new Error("Invalid Email or Password")
        }

        const dataToAddInMyPayload = {
            email: payload.email,
            _id: uuidv4(),
            firstname: payload.firstname,
            lastname:payload.lastname
            }
                jwt.sign(dataToAddInMyPayload, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_TIME },
                (err, token) => {
                    if (err) {
                        throw new Error("Something went wrong")
                    }
                 
                    res.setHeader('token', token).status(200).send({
                                status: true,
                                message: "Successfully logged in "
                   })
                   
                }
        

           )

    }catch(e){
        res.status(400).send({
            status: false,
            message: err.message || "Something went wrong"
        })
    }


}

const startAdminForgetPassword = async (req, res) => {

    const { email } = req.params
    
    try {
        
        let [err, checkIfEmailExist] = await asyncErrorHandler(getAdminByEmail(email))
        if (err) {

            throw new Error('Internal Server Error', 400)
        }
        if (isEmpty(checkIfEmailExist)) {
            throw new Error(`If the email ${email} account exist with us, you will get a reset password email`)
        }
        let hash = uuidv4().replace(/-/gi, '')
        let [err2, createForgetPasword] = await asyncErrorHandler(forgetPasswordModel(email,hash))
       
        if (err2) {
            throw new Error('Please try This is on us, something went wrong')
        }
        if (!isEmpty(createForgetPasword)) {
            
            let dataReplacement = {
                "fullname": ` ${checkIfEmailExist[0].firstname}  ${checkIfEmailExist[0].surname}`,
                "resetPasswordlink": `${process.env.RESET_PASSWORD_LINK}/${hash}`
            }
            //send email
            readFileAndSendEmail(email, "RESET PASSWORD", dataReplacement, "forgetPassword")
        }
       

        res.status(200).send({
            status: true,
            message: `If the email ${email} account exist with us, you will get a reset password email`
        })


    } catch (e) {
        console.log(e)
        res.status(400).send({
            status: true,
            message: e.message 
        })

    }


}

const startAttendantForgetPassword = async (req, res) => {

    const { email } = req.params
    
    try {
        
        let [err, checkIfEmailExist] = await asyncErrorHandler(getAttendantByEmail(email))
        if (err) {

            throw new Error('Internal Server Error', 400)
        }
        if (isEmpty(checkIfEmailExist)) {
            throw new Error(`If the email ${email} account exist with us, you will get a reset password email`)
        }
        let hash = uuidv4().replace(/-/gi, '')
        let [err2, createForgetPasword] = await asyncErrorHandler(forgetPasswordModel(email,hash))
       
        if (err2) {
            throw new Error('Please try This is on us, something went wrong')
        }
        if (!isEmpty(createForgetPasword)) {
            
            let dataReplacement = {
                "fullname": ` ${checkIfEmailExist[0].firstname}  ${checkIfEmailExist[0].surname}`,
                "resetPasswordlink": `${process.env.RESET_PASSWORD_LINK}/${hash}`
            }
            //send email
            readFileAndSendEmail(email, "RESET PASSWORD", dataReplacement, "forgetPassword")
        }
       

        res.status(200).send({
            status: true,
            message: `If the email ${email} account exist with us, you will get a reset password email`
        })


    } catch (e) {
        console.log(e)
        res.status(400).send({
            status: true,
            message: e.message 
        })

    }


}

const completeAdminForgetPassword = async (req, res) => {

    const hash = req.params
    const { newPassword, confirmNewPassword } = req.body
    try {
        const [err, checkIfHashIsValid] = await asyncErrorHandler(validateHash(hash))
        if (err) {
            throw new Error('Internal Server Error', 500)
        }
        if (isEmpty(checkIfHashIsValid)) {

            throw new Error('Unable to perform this operation', 400)
        }
        if (newPassword != confirmNewPassword) {
            throw new Error('Password does not match', 400)
        }

        //update the password
        const passwordHashed = await hashPassword(newPassword)
        let [err2, updatePasswordResponse] = await asyncErrorHandler(updatePassword(passwordHashed[1], checkIfHashIsValid[0].email))
        if (err2) {
            throw new Error('Internal Server Error', 500)
        }

        await deleteResetPasswordRecord(hash)

        res.status(200).send({
            status: true,
            message: `Password successfully updated`
        })
    }
catch (e) {
    console.log(e)
        res.status(400).send({
            status: true,
            message: e.message 
        })
}


}

const completeAttendantForgetPassword = async (req, res) => {

    const hash = req.params
    const { newPassword, confirmNewPassword } = req.body
    try {
        const [err, checkIfHashIsValid] = await asyncErrorHandler(validateHash(hash))
        if (err) {
            throw new Error('Internal Server Error', 500)
        }
        if (isEmpty(checkIfHashIsValid)) {

            throw new Error('Unable to perform this operation', 400)
        }
        if (newPassword != confirmNewPassword) {
            throw new Error('Password does not match', 400)
        }

        //update the password
        const passwordHashed = await hashPassword(newPassword)
        let [err2, updatePasswordResponse] = await asyncErrorHandler(updatePassword(passwordHashed[1], checkIfHashIsValid[0].email))
        if (err2) {
            throw new Error('Internal Server Error', 500)
        }

        await deleteResetPasswordRecord(hash)

        res.status(200).send({
            status: true,
            message: `Password successfully updated`
        })
    }
catch (e) {
    console.log(e)
        res.status(400).send({
            status: true,
            message: e.message 
        })
}


}

// const logout = () => {
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2hib25AZ21haWwiLCJwaG9uZSI6IjA4MDg0MjU5MzcyIiwiaWQiOiI5NTVlMTgzZC05ZDgxLTQ4ODAtYjUwZi0wYjYxN2Y2MDYyZDAiLCJpYXQiOjE2NDQ0Mzk4NTcsImV4cCI6MTY0NDQ0MzQ1N30.ozOgwaUIezSbCPSo454QguZnpZ3GzaZDNikmccMgqqY"
//     jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//         console.log(JSON.stringify(decoded)) // bar
//       });
// }

module.exports = {
    adminLogin,
    attendantLogin,
    startAdminForgetPassword,
    startAttendantForgetPassword,
    completeAdminForgetPassword,
    completeAttendantForgetPassword
     
}
