const config = require("../config/configVars")
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.header(config.headerTokenName)
  if (!token) res.sendStatus(401)

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}

const admin = (req, res, next) => {
  if (req.user.isAdmin) return next()
  res.sendStatus(403)
}

module.exports = { auth, admin }
