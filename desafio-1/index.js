class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const params = [title, description, price, thumbnail, code, stock]

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (params.some(param => param === undefined || param === null || param === '')) {
            console.log("All fields are required")
            return
        }

        
        const codeFound = this.products.find((product) => product.code === code)
        
        if(codeFound) {
            console.log(`The code ${code} already exists`)
            return `The code ${code} already exists`
        } 

        this.products.push(newProduct)
        console.log(`Product ${title} registered successfully`)
    }

    getProductById(id) {
        const idFound = this.products.find((product) => product.id === id)

        if(!idFound){
            return `Not found ID:${id}`
        }

        return idFound
    }
}



const product = new ProductManager()

console.log("First getProducts",product.getProducts())

product.addProduct("title", "description", "price", "", "code123", "stock4")

product.addProduct("Velas aromaticas de Coco", "Olor a coco y jasmin", "9900", "URLImage", "123", "100")
console.log("Second getProduct",product.getProducts())

product.addProduct("Velas aromaticas de Vainilla", "Olor a vainilla", "12000", "URLImage", "123", "200")
console.log("Third getProduct", product.getProducts())


console.log("First getProductById:", product.getProductById(1))

console.log("Second getProductById:", product.getProductById(5))
