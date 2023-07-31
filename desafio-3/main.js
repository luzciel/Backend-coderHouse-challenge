const express = require('express');
const app = express();
const Contenedor = require('../desafio-2/index.js');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = 8080;

const getProduct = async() => {
  const productos = new Contenedor('./desafio-3/productos.txt');
  try{
    const listProduct = await productos.getAll();
    return listProduct
  }catch(error){
    console.log("Error al obtener los productos")
  }
}

app.get('/productos', async (req, res) => {
  try{
  const productos = await getProduct();
  res.status(200).json(productos);

  }catch(error){
    console.log(error);
    res.status(500).json({ Error: "Internal server error" });
  }
});

app.get('/productoRandom', async (req, res) => {
  try{
    const productos = await getProduct();
    const random = Math.floor(Math.random() * productos.length);
    res.json(productos[random]);

  }catch(error){
    console.log(error);
    res.status(500).json({ Error: "Internal server error" });
  }

})


const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})