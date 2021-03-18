#!/usr/bin/env node
const express = require('express')
const proxy = require('express-http-proxy')
const mri = require('mri')

const argv = process.argv.slice(2)
const args = mri(argv)._ || []

if (args.length !== 2 || !Number.isInteger(parseInt(args[0]))) {
  console.log(`
    Usage:
            npx ${require('./package.json').name} <port> <url>
  `)

  process.exit(1)
}

const [port, url] = args

const app = express()

app.use('/', proxy(url))
app.listen(port, () => console.log(`Listening on port ${port}...`))
