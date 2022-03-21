const mysqlConnection = require('../config/mysql')

const newAttendantUser = async (fullname, email, phone, password, attendant_id) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into attendant(fullname, email, phone, password, attendant_id)values(?,?,?,?,?)`,
            values: [fullname, email, phone, password, attendant_id]
        }
         ,  (err, results) => {
             if (err) {
               reject(err); 
             }
             resolve(results);
         })
      })
}

const checkAttendantUser = async ( email, phone ) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `select * from attendant where email=? or phone = ?`,
            values: [email, phone]
        }
         ,  (err, results, fields) => {
             if (err) {
               reject(err); 
             }
             resolve(results);
         })
      })
}

const getAttendantByEmail = async ( email ) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `select * from attendant where email=?`,
            values: [email]
        }
         ,  (err, results, fields) => {
             if (err) {
               reject(err); 
             }
             resolve(results);
         })
      })
}

module.exports ={
    newAttendantUser,
    checkAttendantUser,
    getAttendantByEmail

}