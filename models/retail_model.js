const mysqlConnection = require('../config/mysql')

const newRetaiUser = (fullName, email, admin_id, password, isAdmin) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into admin(fullName, email, admin_id, password, isAdmin)values(?,?,?,?,?)`,
            values: [fullName, email, admin_id, password, isAdmin]
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

const getAdminbyEmail = async ( email ) => {
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
checkNewRetaiUser,
getAdminbyEmail
    
}

