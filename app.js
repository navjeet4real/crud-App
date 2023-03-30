const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const routes = require('./routes/index')

const app = express()

app.use(express.json({
    limit: '100mb'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
}));
app.use(routes);

module.exports = app;