const sql = require("./db")

//constructor
function Admin(admin) {
  this.admin_name = admin.admin_name
  this.password = admin.password
  this.phone_no = admin.phone_no
  this.avatar_img = admin.avatar_img
}

Admin.create = (newAdmin, result) => {
  sql.query(`INSERT INTO ADMIN SET ? `, newAdmin, (err, res) => {
    if (err) {
      result(err, null)
      return
    }
    result(null, newAdmin)
  })
}

Admin.findByName = (name, result) => {
  sql.query(`SELECT * FROM ADMIN WHERE admin_name='${name}'`, (err, res) => {
    if (err) {
      result(err, null)
    }
    result(null, res[0])
  })
}

module.exports = Admin
