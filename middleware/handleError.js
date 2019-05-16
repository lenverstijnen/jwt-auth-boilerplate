const winston = require("winston")

module.exports = (err, req, res, next) => {
  console.log(err)
  winston.error(err.message, err)

  res.status(500).send("Er ging iets mis")
}
