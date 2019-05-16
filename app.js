require("dotenv").config()
const app = require("express")()
const winston = require("winston")
const config = require("./config/configVars")
const startDbConnection = require("./startup/startDbConnection")
const startRoutes = require("./startup/startRoutes")
const startLogger = require("./startup/startLogger")
const checkConfig = require("./startup/checkConfig")
const { auth, admin } = require("./middleware/auth")

//Test route
app.get("/", [auth], (req, res) => {
  res.send("Je hebt toegang tot deze beveiligde route")
})

//Start up
startLogger()
checkConfig()
startDbConnection()
startRoutes(app)

//TODO: CatchAll Route for running front-end

//Start server
app.listen(config.port, () =>
  winston.info(`App listens on port ${config.port}`)
)
