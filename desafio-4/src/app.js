const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.render("home.hbs");
})

let products = []

io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado");

    socket.on("chatMessage", (message, id, price) => {
        products = [...products, {id, message, price}];
        io.emit("message", {message, id, price})
    })


    socket.on("deleteMessage", (id) => {
        const newData = products.filter(product => product.id !== id)
        products = newData
        io.emit("deleteProduct", products)
    })

    socket.on("disconnect", () => {
        console.log("Un usuario se ha desconectado");
    })
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
