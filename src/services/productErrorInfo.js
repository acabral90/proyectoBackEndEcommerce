export const generateProductErrorInfo = (product) =>{
    return `
    Alguno de los campos para crear el producto no es valido:
    Lista de campos requeridos:
    title: Debe ser un campo string, pero recibió ${product.title},
    description: Debe ser un campo string, pero recibió ${product.description},
    price: Debe ser un campo string, pero recibió ${product.price},
    stock: Debe ser un campo numerico,  pero recibió ${product.stock}
    category: Debe ser un campo string, pero recibió ${product.category}
    ` 
}
