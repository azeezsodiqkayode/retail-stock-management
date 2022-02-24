require('dotenv').config()
const{ v4: uuidv4 } = require('uuid')
require('dotenv').config()
const{ v4: uuidv4 } = require('uuid')
const {purchaseInfo} = require("../models/purchase.models")
const {getStockDetails, updateProductQuantity, getProductInfo } = require("../models/stock.models")

const purchaseList = async (req, res) =>{
    // const data ={
    //     data:[
    //         {item: {quantity: 1000, productName: "milo", amount: 500}},
        
    //         {item: {quantity: 100, productName: "bis", amount: 500}},
        
    //         {item :{quantity: 1000, productName: "milo", amount: 50}}
    //     ]
    
    // }
    try{
        let i = 0
        let dataLength = data.data.length
        const purchaseID = uuidv4()

            do {
                itemData = data.data[i].item
            //let  {productID, quantity, productName, amount} = itemData
                let quantityOfEach = itemData.quantity
                let productName = itemData.productName
                let amountOfEachProduct = itemData.amount
                
                const [err3, checkProductDetails]= await doSomeAsyncMagik(getProductInfo(productName))
                productID = checkProductDetails[0].product_id

                const [err4, checkProductQuantity] = await doSomeAsyncMagik(getStockDetails(productID))
                productQuantity = checkProductQuantity[0].quantity

                const updatedQuantity = parseInt(productQuantity) - parseInt(quantityOfEach)

                const [err5, checkProductQunatityUpdated] = await doSomeAsyncMagik(updateProductQuantity(updatedQuantity, productID))

                const [err2, checkIfPurchaseIsLogged] = await doSomeAsyncMagik(purchaseInfo(productName, quantityOfEach,amountOfEachProduct,purchaseID))
                if(err2){
                    throw new Error ("Internal Error")
                }
                if(isEmpty(checkIfPurchaseIsLogged)){
                    throw new Error ("something went wrong, please try again")
                }
                i++;
                res.status(200).send({
                    status: true,
                    message: "Purchase logged"

                })
                


            } while(i < dataLength );
    } catch(e){
        res.status(201).send({
            status: true,
            message: "Something went wrong"

        })
    }



}



module.exports = {
    purchaseList
}