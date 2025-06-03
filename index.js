

import { argv } from "process";

//Función para obtener GET el producto por ID
const productoId = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(`Error al obtener el producto ${id}:`, e);
  }
};

//Función para obtener el producto por ID a DELETE
const getProductById = async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Error al obtener el producto con el ID: ${id}`, e);
    return null;
  }
};

// Función que busca el producto a DELETE y lo muestra por consola
const productoIdDelete = async (id) => {
  try {
        // Primero busca obtener el producto por el ID
        const product = await getProductById(id);
        if (!product) {
          console.error(`No se pudo obtener el producto con el ID: ${id}`);
          return;
        }

        // Procede a eliminar el producto
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Si el DELETE estuvo ok, muestra el producto eliminado por consola
        if (response.ok) {
          const { title, price, category } = product; // Use the details from the GET request
          console.log(`Producto eliminado: ID: ${id}, Title: ${title}, Price: ${price}, Category: ${category}`);
          console.log(`La eliminación del producto con el ID: ${id}, fue exitosa.`);
        } else {
          console.error(`No se pudo eliminar el producto con el ID: ${id}`);
        }
  } catch (e) {
    console.error(`Error al intentar eliminar el producto con el ID: ${id}`, e);
  }
};



//Función principal
const main = async () => {
    //Rutina con POST
      if (argv[2] === "POST" && argv[3] === "products" && argv[4] != null) {
      const input = argv[4];
      const prod = input.split(",");//El title,price,categoria deben ir separados por "," para que split extraiga las ","
      //  y pase el texto al array
      const [title, price, category] = prod;
     
      const producto = {
        title: title,
        price: parseFloat(price),
        category: category
      };
      try{
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(producto)
      });
        const data = await response.json();
        console.log(data);//muestra por consola el producto creado
      }catch (error){
        console.error('Error al crear el producto',error);
      };
    };
      //Rutina con DELETE
      const idDel = /^products\/\d+$/.test(argv[3]);
      if(argv[2] === "DELETE" && idDel){  
        const idItem = argv[3].split("/")[1];
        console.log(`El producto con el ID ${idItem} ingresado para ser eliminado es:`);
        await productoIdDelete(idItem);
      }
    
    //Rutina con GET products
    if (argv[2] === "GET" && argv[3]=== "products"){
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error al traer productos, tenés que usar: GET products', e);
      }
    }

    //Rutina con GET products/id
      const item = /^products\/\d+$/.test(argv[3]);
     if (argv[2] === "GET" && item){
      const itemId = argv[3].split("/")[1];//extrae el id del producto
      console.log(`El producto con el ID ${itemId} es:`);
      await productoId(itemId); //Es la llamada a la función que obtiene los datos del producto y le paso el id
    };
};
    
main();

    
    

//console.log('https://fakestoreapi.com/products');
//https://fakestoreapi.com/products'
//https://fakestoreapi.com/products/${id}

/* npm run start GET products/15 trae solo el numero 15  y npm run start GET products 15 trae el 15 tambien
npm run start POST products T-Shirt-Rex 300 remeras*/