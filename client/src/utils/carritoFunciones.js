const carritoKey = "carritoMemoria";

export function addCarrito(idProducto){
    let carrito = {}; //objeto vacio
    try {
        const datos = sessionStorage.getItem(carritoKey); //Busca si existe en sessionStorage un key llamado: carritoKey
        carrito = JSON.parse(datos) || {}; //Si existe el carrito lo parsea a un objeto, si no existe lo mantiene en vacio.
    } catch (error) { 
        //si falla el parseo crea objeto vacio. Si no existe el carrito retorna null y esto no se ejecuta la excepcion.
        carrito = {};
    }

    if(carrito[idProducto]){ //si existe en el objeto alguna propiedad con idProducto, retorna su valor. Null si no.
        carrito[idProducto]++;
    }else{
        carrito[idProducto] = 1; //si no exite crea en carrito un objeto con propiedad (key) "idProducto" y valor 1.
    }

    sessionStorage.setItem(carritoKey, JSON.stringify(carrito)); //serializa a json para guardarlo en sessionstorage
}
    /*
        carrito["producto1"] = 1; trabaja con objetos json no con arrays.
        Es lo mismo que:
        const carrito = {
            "producto1": 1
        }
    EJ:
        let carrito = {};
        let idProducto = 'abc123';
        carrito[idProducto] = 1;
            //se crea una propiedad "idProducto" en el objeto vacio carrito y se asigna el valor 1.

    */

export function cantidadElementosCarrito(){
    let elementos = 0;
    let carrito = {};
    try {
        const datos = sessionStorage.getItem(carritoKey);
        carrito = JSON.parse(datos) || {}; 
    } catch (error) { 
        carrito = {};
    }

    if(!carrito) return 0;

    for(const key in carrito){ //{elementos++;} //cuenta por elementos distintos.
        elementos+=carrito[key];
    }
    return elementos;
}