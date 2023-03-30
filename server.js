require("dotenv").config();
const app = require("./app"); 
const mongoose = require("mongoose");

const http = require("http");

const server = http.createServer(app);
const DB = process.env.DBURI

mongoose.connect(DB).then((prop) => {
    console.log("Mongo Connecteddd... !")
}).catch((err) => {
    console.log(err)
})
const port = process.env.PORT

server.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

process.on("unhandledRejection", (err) => {
    console.log(err);
    server.close(() => {
        process.exit(1);
    })
})