const bodyParser = require("body-parser")
const handleError = require("../middleware/handleError")

module.exports = app => {
  //Middleware
  app.use(bodyParser.json())
  //Routes
  app.use("/api/users", require("../routes/users"))
  app.use("/api/auth", require("../routes/auth"))
  //Errors
  app.use(handleError)
}
