require('dotenv').config()
const{ v4: uuidv4 } = require('uuid')
const {getProductInfo, newStock, createProductInfo, 
        getStockDetails, updateProductQuantity} = require('../models/stock.models')
const Joi = require('joi')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')


const generateProductID = async(req, res) =>{
   const { productName} = req.body
   const productID = uuidv4()

   const productSchema = Joi.object({
       productName: Joi.string().required()
   })

   const responseFromJoiValidation = productSchema.validate(req.body)
       if(responseFromJoiValidation.error){
            res.status(422).send({
                status: false,
                message: "Bad Request"
            })
       }

   try {
       await createProductInfo(productName, productID)

       res.status(200).send({
           status: true,
           message: "Product successfully logged"
       })

   }

   catch(e){
        res.status(200).send({
            status: false,
            message: "Error occurred, Try again"
        })
   }

}

const getStockInfo = async(req, res) =>{

}


const addToStock = async (req, res) =>{
    const { productName, quantity, pricePerUnit}= req.body

    try{
        const [err, checkIfProductExists] = await doSomeAsyncMagik(getProductInfo(productName))
        if(err){
            throw new Error("Internal Error")
        }
        if (isEmpty(checkIfProductExists)){
            let productID = uuidv4()
            await createProductInfo(productName, productID)
            await newStock(productID, productName, quantity, pricePerUnit)
                res.status(200).send({
                    status: true,
                    message: "Item successfully added to stock"
    
            })

        }

        const productID = checkIfProductExists[0].product_id

        const [err2, checkIfStockExist] = await doSomeAsyncMagik(getStockDetails(productID))
        if(err2){
            throw new Error ("Internal Error")
        }
        if(isEmpty(checkIfStockExist)){
           await newStock(productID, productName, quantity, pricePerUnit)
                res.status(200).send({
                    status: true,
                    message: "Item successfully added to stock"
        
                })
        }
        const newQuantity = parseInt((checkIfStockExist[0].quantity)) + parseInt(quantity)

        console.log(newQuantity)
        console.log(productID)


        const [err3, checkIfProductUpdate] = await doSomeAsyncMagik(updateProductQuantity(newQuantity, productID))
        if (err3){
            throw new Error ("Internal Error")
        }   
            res.status(200).send({
                status: true,
                message: "Quantity Updated"

            })
     
    }
    catch(e){
        res.status(200).send({
            status: false,
            message: "Item couldn't be added, please try again later"
        })
    }

}



module.exports ={
    addToStock,
    generateProductID,
    

}