const sql = require("./db")

function User(user) {
  if (user.user_type === 0) {
    this.user_name = user.user_name
    this.user_type = user.user_type
    this.phone_no = user.phone_no
    this.sfz_no = user.sfz_no
    this.sfz_front = user.sfz_front
    this.sfz_back = user.sfz_back
    this.submit_time = user.submit_time
    this.check_status = user.check_status
    this.feedback = user.feedback
  } else if (user.user_type === 1) {
    this.user_name = user.user_name
    this.user_type = user.user_type
    this.phone_no = user.phone_no
    this.sfz_no = user.sfz_no
    this.sfz_front = user.sfz_front
    this.sfz_back = user.sfz_back
    this.submit_time = user.submit_time
    this.check_status = user.check_status
    this.company_name = user.company_name
    this.license_no = user.license_no
    this.license_img = user.license_img
    this.application_img = user.application_img
    this.feedback = user.feedback
  }
}

User.create = (user, result) => {
  console.log("user", user)

  sql.query(`insert into userCheck set ? `, user, (err, res) => {
    if (err) {
      console.log(err)

      result(err, null)
    }
    result(null, res)
  })
}

User.findById = (id, result) => {
  console.log(id)

  sql.query(`select * from userCheck where user_id='${id}'`, (err, res) => {
    if (err) {
      result(err, null)
      return
    }
    result(null, res)
  })
}

User.update = (openid, newUser, result) => {
  console.log("user:", newUser)

  sql.query(
    `update userCheck set ? where user_id='${openid}'`,
    newUser,
    (err, res) => {
      if (err) {
        result(err, null)
      }
      result(null, res)
    }
  )
}

User.getAllUser = (result) => {
  sql.query(`select * from userCheck`, (err, res) => {
    if (err) {
      result(error, null)
    }
    result(null, res)
  })
}

User.userPagination = (currentPage, pageSize, result) => {
  sql.query(
    `select * from userCheck order by submit_time limit ${
      (currentPage - 1) * pageSize
    },${pageSize}`,
    (err, res) => {
      if (err) {
        result(err, null)
      }
      result(null, res)
    }
  )
}

User.getUnprocessUser = (result) => {
  sql.query(
    `select * from userCheck where check_status=0 or check_status=3`,
    (err, res) => {
      if (err) {
        result(error, null)
      }
      result(null, res)
    }
  )
}

User.unprocessUserPagination = (currentPage, pageSize, result) => {
  sql.query(
    `select * from userCheck where check_status=0 or check_status=3 order by submit_time limit ${
      (currentPage - 1) * pageSize
    },${pageSize}`,
    (err, res) => {
      if (err) {
        result(err, null)
      }
      result(null, res)
    }
  )
}

User.findByName = (currentPage, pageSize, user_name, result) => {
  sql.query(
    `select * from userCheck where user_name='${user_name}' limit ${
      (currentPage - 1) * pageSize
    },${pageSize}`,
    (err, res) => {
      if (err) {
        result(err, null)
      }
      result(null, res)
    }
  )
}

//默认下一个是提交时间最早的未处理用户申请
User.nextUnprocessedUser = (user_id, result) => {
  sql.query(
    `select user_id from (select * from usercheck where check_status=0 or check_status=3) as unprocess 
    where submit_time > (select submit_time from usercheck where user_id='${user_id}') 
    order by submit_time limit 1`,
    (err, res) => {
      if (err) {
        result(error, null)
      }
      result(null, res[0])
    }
  )
}

User.preUnprocessedUser = (user_id, result) => {
  sql.query(
    `select * from (select * from usercheck where check_status=0 or check_status=3) as unprocess 
    where submit_time < (select submit_time from usercheck where user_id='${user_id}')
     order by submit_time desc limit 1`,
    (err, res) => {
      if (err) {
        result(error, null)
      }
      result(null, res[0])
    }
  )
}

User.nextUser = (user_id, result) => {
  sql.query(
    `select user_id from userCheck 
    where submit_time > (select submit_time from usercheck where user_id='${user_id}') 
    order by submit_time limit 1`,
    (err, res) => {
      if (err) {
        result(error, null)
      }
      result(null, res[0])
    }
  )
}

User.preUser = (user_id, result) => {
  sql.query(
    `select * from userCheck 
     where submit_time < (select submit_time from usercheck where user_id='${user_id}')
     order by submit_time desc limit 1`,
    (err, res) => {
      if (err) {
        result(error, null)
      }
      result(null, res[0])
    }
  )
}
module.exports = User
