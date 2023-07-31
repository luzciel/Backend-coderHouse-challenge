# Backend-coderHouse-challenge

## Consigna desafio 1 
Realizar una clase “ProductManager” que gestione un conjunto de productos.

### Aspectos a incluir
- Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.  
- Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)
- Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.  
- Validar que no se repita el campo “code” y que todos los campos sean obligatorios. 
- Al agregarlo, debe crearse con un id autoincrementable.
- Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento.
- Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id.
En caso de no coincidir ningún id, mostrar en consola un error “Not found”

## Consigna desafio 2 (Manejo de archivos)
Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

- save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
- getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
- getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
- deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
- deleteAll(): void - Elimina todos los objetos presentes en el archivo.

### Aspectos a incluir
- El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
- Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
- Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
- Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
- Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 
- El formato de cada producto será :
```js
{
  title: (nombre del producto),
  price: (precio),
  thumbnail: (url de la foto del producto)

}
```

## Consigna desafio 3

Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
- Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
- Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

### Aspectos a incluir
- Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

- Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.