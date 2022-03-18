const mySqlConnection = require('../config/mysql')


const createProductInfo = async(productName, productID) =>{

    return new Promise ((resolve, reject) =>{
        mySqlConnection.query({
            sql: `Insert into products (product_name, product_id)values (?,?)`,
            values: [productName, productID]
        }

        , (err, results, fields) =>{
            if(err){
                reject(err);
            }
            resolve(results);
        })

        
    })    



}



const getProductInfo = async (productName) => {
    return new Promise((resolve, reject) =>{
        mySqlConnection.query ({
            sql: `select * from products where product_name = ?`,
            values: [productName]


        },
        (err, results, fields) =>{
            if(err){
                reject (err)
            }
            resolve(results)
        
        })
    })

}



const newStock = async(productID, productName, quantity, pricePerUnit) =>{

    return new Promise ((resolve, reject) =>{
        mySqlConnection.query({
            sql: `Insert into stock (product_id, name_of_product, quantity, price_per_unit)values (?,?,?,?)`,
            values: [productID, productName, quantity, pricePerUnit]
        }

        , (err, results, fields) =>{
            if(err){
                reject(err);
            }
            resolve(results);
        })

        
    })        


}

const getStockDetails = async(productID) =>{

    return new Promise ((resolve, reject) =>{
        mySqlConnection.query({
            sql: `select * from stock where product_id = ?`,
            values: [productID]
        }

        , (err, results, fields) =>{
            if(err){
                reject(err);
            }
            resolve(results);
        })

        
    })    
}

const updateProductQuantity = async(newQuantity, productID) =>{
    return new Promise((resolve, reject) => {

        mySqlConnection.query({
            sql: `update stock set quantity=? where product_id=?`,
            values: [newQuantity, productID]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                // console.log(JSON.stringify(results), "result from sql")
                resolve(results)
          })
    })
}


module.exports ={
    newStock,
    getProductInfo,
    createProductInfo,
    getStockDetails,
    updateProductQuantity
}
