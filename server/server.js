require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const compression = require('compression')
const db = require("./db/db")
const logger = require("./utils/logger")

const { success, error } = require("./utils/response")

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())
app.use(compression())
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

app.get("/users", async (req, res, next) => {
  try {
    const [result] = await db.query("SELECT * FROM users")
    return success(res, result, "Users fetched successfully")
  } catch (err) {
    next(err)
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'API Running' })
})

app.use((req, res) => {
  return error(res, "Route not found", 404)
})

app.use((err, req, res, next) => {
  logger.error("Unhandled Error:", err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

const gracefulShutdown = () => {
  logger.info('Received shutdown signal, closing gracefully...')
  server.close(() => {
    logger.info('Server closed')
    db.end(() => {
      logger.info('Database connection pool closed')
      process.exit(0)
    })
  })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)