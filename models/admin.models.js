const mysqlConnection = require('../config/mysql')

const newAdminUser = async (fullname, email, phone, password, admin_id) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into admin(fullname, email, phone, password, admin_id)values(?,?,?,?,?)`,
            values: [fullname, email, phone, password, admin_id]
        }
         ,  (err, results) => {
             if (err) {
               reject(err); 
             }
             resolve(results);
         })
      })
}

const checkAdminUser = async ( email, phone ) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `select * from admin where email=? or phone = ?`,
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

const getAdminByEmail = async ( email ) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `select * from admin where email=?`,
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

const forgetPasswordModel = async(email, hash) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query(
            {
                sql: `Insert into _forget_password(email,hash)values(?,?)`,
                values: [email,hash]
            },
            (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
 
 
 
}

const validateHash = async (hash) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from _forget_password where hash=?`,
            values: [hash]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const updateAdminPassword = async (password, email) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `update admin set password=? where email=?`,
            values: [password, email]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const deleteResetPasswordRecord = async (hash) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `delete from _forget_password where hash=?`,
            values: [hash]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}


module.exports = {
    newAdminUser,
    checkAdminUser,
    getAdminByEmail,
    forgetPasswordModel,
    validateHash,
    updateAdminPassword,
    deleteResetPasswordRecord
    
}

