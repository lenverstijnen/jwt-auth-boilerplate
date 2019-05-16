module.exports = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("FATAL ERROR: process.env.JWT_SECRET is not set!")
  }
}
