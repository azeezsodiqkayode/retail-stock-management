const mysqlConnection = require('../config/mysql')

const newRetaiUser = (fullName, email, Admin_id, password, IsAdmin) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into customers(fullName, email, Admin_id, password, IsAdmin)values(?,?,?,?,?)`,
            values: [fullName, email, Admin_id, password, IsAdmin]
        }
         ,  (err, results) => {
             if (err) {
               reject(err); 
             }
             resolve(results);
         })
      })
}


module.exports = {
newRetaiUser
    
}

