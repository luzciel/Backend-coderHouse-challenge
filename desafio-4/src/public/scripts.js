const socket = io();

document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = crypto.randomUUID();
  const productInput = document.getElementById("product");
  const priceInput = document.getElementById("price");
  const product = productInput.value;
  productInput.value="";
  const price = priceInput.value;
  priceInput.value="";

  socket.emit("chatMessage", product, String(id), price);
})

socket.on("message", (data) => {
  const chatMessages = document.getElementById("chat-products");
  const messageElement = document.createElement("div")
  messageElement.innerHTML = `<p><strong>Producto:</strong> ${data.message} <strong> </br> Precio: </strong>${data.price} </p>
  <button id="${data.id}" onclick="deleteMessage(String(this.id))">Eliminar</butto>`   
  chatMessages.appendChild(messageElement)
})

const deleteMessage = (id) => {
  socket.emit("deleteMessage", id)
}

socket.on("deleteProduct", (data) => {
  const chatMessages = document.getElementById("chat-products")
  chatMessages.innerHTML = ""

  data.forEach(product => {
    const messageElement = document.createElement("div")
    messageElement.innerHTML = `<p><strong>Producto:</strong> ${product.message} <strong> </br> Precio: </strong>${product.price} </p>
    <button id="${product.id}" onclick="deleteMessage(String(this.id))">Eliminar</butto>`   
    chatMessages.appendChild(messageElement)
  });
})