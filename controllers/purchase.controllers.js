require('dotenv').config()
const{ v4: uuidv4 } = require('uuid')
require('dotenv').config()
const{ v4: uuidv4 } = require('uuid')
const {purchaseInfo} = require("../models/purchase.models")

const purchaseList = async (req, res) =>{
    data = [quantity1, productname1, amount1, quantity2, productname2, amount2, quantity3, productname3, amount3]

    data = req.body

    const newData =[]
    for(let i =0; i< data.length ; i+=3){
        let newObj = {}
        newObj.quantity = data[i]
        newObj.productName = data[i+1]
        newObj.amount = data[i+2]
        newData.push(newObj)
    }

    try{
        const [err, checkIfProductIdFetched] = await doSomeAsyncMagik(getProductInfo(productName))
        if (err){
            throw new Error ("Internal error")
        }
        if(isEmpty(checkIfProductIdFetched)){
            throw new Error("Product doesn't exist in stock")
        }
        
        const productID = checkIfProductIdFetched[0].product_id
    }
    catch(e){

    }
}



module.exports = {
    purchaseList
}