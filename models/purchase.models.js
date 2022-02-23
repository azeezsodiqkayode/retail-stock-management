const mySqlConnection = require('../config/mysql')

const purchaseInfo = async (productID, quantityOfEach,  amountOfEachProduct, purchaseID, totalAmountOfPurchase, modeOfPayment ) =>{
    return new Promise ((resolve, reject) =>{
        mySqlConnection.query({
            sql: `Insert into purchase (product_id, quantity_of_each_product, amount_of_each_product, purchase_id, total_amount_of_purchase, mode_of_payment)values (?,?,?,?,?,?)`,
            values: [productID, quantityOfEach, amountOfEachProduct, purchaseID, totalAmountOfPurchase, modeOfPayment]
        }

        , (err, results, fields) =>{
            if(err){
                reject(err);
            }
            resolve(results);
        })

        
    })    
}


module.exports={
    purchaseInfo
}