'use strict'
const env = process.env.NODE_ENV
const dbUser = process.env.DB_USER
const dbPw = process.env.DB_PW
const mongoose = require('mongoose')
const chalk = require('chalk')
const dbUri = env === 'production'
                      ? `mongodb://${dbUser}:${dbPw}@ds157740.mlab.com:57740/code_notes`
                      : `mongodb://localhost/code_notes`

mongoose.Promise = require('bluebird')
mongoose.connect(dbUri)

mongoose.connection.on('error', (err) => {
  console.log(chalk.red(`Mongoose connection error: \n\t${chalk.red.bold.underline(err)}`))
})

mongoose.connection.on('connected', () => {
  console.log(chalk.green(`Mongoose connected to: \n\t${chalk.green.bold.underline(dbUri)}`))
})

mongoose.connection.on('disconnected', () => {
  console.log(chalk.yellow(`Mongoose has been disconnected`))
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(chalk.cyan(`App terminated. Mongoose connection closed.`))
    process.exit(0)
  })
})

module.exports = require('./app')
