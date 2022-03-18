const mySqlConnection = require('../config/mysql')

const purchaseInfo = async (productName, quantityOfEach,  amountOfEachProduct, purchaseID ) =>{
    return new Promise ((resolve, reject) =>{
        mySqlConnection.query({
            sql: `Insert into purchase (product_name, quantity_of_each_product, amount_of_each_product, purchase_id)values (?,?,?,?,?,?)`,
            values: [productName, quantityOfEach, amountOfEachProduct, purchaseID]
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