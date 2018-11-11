require('@babel/register')({
  presets: ['@babel/preset-env']
})

const dotenv = require('dotenv')
dotenv.config()

module.exports = require('./index.js')
