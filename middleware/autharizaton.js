//session authentication 
const authUser = (req, res, next) => {
    // console.log("New Request", req.session)
    // console.log("Session ID After Log Out", req.sessionID)
    if (req.session.emailID && req.session.isLogged === true) {
      next()
    } else {
      res.redirect('/login')
    }
  }
  
  module.exports = {
    authUser
  }