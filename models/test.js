const mysqlConnection = require('../config/mysql')

const newRetaiUser = (fullName, email, Admin_id, password, IsAdmin) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into admin(fullName, email, Admin_id, password, IsAdmin)values(?,?,?,?,?)`,
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

const checkNewRetaiUser = ( email ) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `select * from admin where email=?`,
            values: [email]
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
newRetaiUser,
checkNewRetaiUser
    
}

