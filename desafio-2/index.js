const fs = require('fs').promises;

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    async save(product) {
        try{
            const products = await this.getAll();
            const id = products.length ? products[products.length - 1].id + 1 : 1;
            const newProduct = {
                id,
                ...product
            } 

            products.push(newProduct);          
            await this.saveNewProduct(products);

            return id;
        }catch(error){
            throw new Error("Error al guardar el producto y ID");
        }
    }

    async getById(id) {
        try{
            const data = await this.getAll();
            const product = data.find(product => product.id === id);
            return product ?? null;
        }catch(error){
            throw new Error("Error al buscar el producto por ID:", id);
        }
    }

    async getAll() {
        try {
            const products = await fs.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        try{
            const data = await this.getAll();
            const products = data.filter(product => product.id !== id);
            await fs.writeFile(this.nombreArchivo, JSON.stringify(products));
        }catch(error){
            throw new Error("Error al borrar el producto");
        }
    }

    async deleteAll(){
        try{
           await fs.writeFile(this.nombreArchivo, JSON.stringify([]));  
        }catch(error){
            throw new Error("Error al borrar todos los productos");
        }
       
    }

    async createFile() {
        try {
            const data = [];
            await fs.writeFile(this.nombreArchivo, JSON.stringify(data));
            console.log("Archivo creado")
        } catch (error) {
            throw new Error("error al crear archivo")

        }
    }

    async saveNewProduct(product) {
        try{
            await fs.writeFile(this.nombreArchivo, JSON.stringify(product));
        }catch(error){
            throw new Error("Error al guardar el producto");
        }
  
    }

    
}

const ejecutar = async () => {
    const producto1 = {
        title: "nombre del producto",
        price: "precio",
        thumbnail: "url de la foto del producto"
    }


    const product = new Contenedor('productos.txt');
    //Crear archivo
    await product.createFile();

    //Guardar producto
    const id = await product.save(producto1);
    const id2 = await product.save(producto1);
    console.log("Producto creado con ID:", id);
    console.log("Producto creado con ID:", id2);

    //Obtener producto segun su ID
    console.log("Obtener producto segun su ID", await product.getById(1));

    // //Obtener todos los productos
    console.log("Obtener todos los productos", await product.getAll());

    //Eliminar producto segun su ID
    const deleteId = 2
    console.log("Eliminar el producto con el Id:", deleteId);
    await product.deleteById(deleteId)
    console.log("El archivo ahora contiene los siguientes productos", await product.getAll(1));

    //Eliminar todos los objetos presentes en el archivo
    await product.deleteAll();
    console.log("Se elimina todos los objetos presentes en el archivo, ahora el archivo solo contienen:", await product.getAll());
}

//ejecutar().catch((error) => console.error(error));

module.exports = Contenedor

