const socket = io();

document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = crypto.randomUUID();
  const messageInput = document.getElementById("message");
  const message = messageInput.value;
  messageInput.value="";

  socket.emit("chatMessage", message, String(id));
})

socket.on("message", (data) => {
  const chatMessages = document.getElementById("chat-products");
  const messageElement = document.createElement("div")
  messageElement.innerHTML = `<strong>${data.message}</strong> <button id="${data.id}" onclick="deleteMessage(String(this.id))">Eliminar</butto>`   
  chatMessages.appendChild(messageElement)
})

const deleteMessage = (id) => {
  socket.emit("deleteMessage", id)
}

socket.on("deleteProduct", (data) => {
  const chatMessages = document.getElementById("chat-products")
  chatMessages.innerHTML = ""

  data.forEach(element => {
    const messageElement = document.createElement("div")
    messageElement.innerHTML = `<strong>${element.message}</strong> <button id="${element.id}" onclick="deleteMessage(String(this.id))">Eliminar</butto>`   
    chatMessages.appendChild(messageElement)
  });
})