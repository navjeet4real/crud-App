require("dotenv").config();
const app = require("./app"); 
const mongoose = require("mongoose");

const http = require("http");

const server = http.createServer(app);
const DB = "mongodb+srv://navjeetkajal2594:Wojtek4real@cluster0.h3yelhk.mongodb.net/?retryWrites=true&w=majority"
const PORT = 8000

mongoose.connect(DB).then((prop) => {
    console.log("Mongo Connecteddd... !")
}).catch((err) => {
    console.log(err)
})
const port = PORT

server.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

process.on("unhandledRejection", (err) => {
    console.log(err);
    server.close(() => {
        process.exit(1);
    })
})