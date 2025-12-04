import React, {createContext, useState, useEffect} from "react";

export const CartContext = createContext(null);

export const CartProvider = ({children})=>{

    const [currentCart, setCurrentCart] = useState([]);
    const [newSession, setNewSession] = useState(true); //estado para la primera vez que se actualiza la pagina
    const [estadoModalCarrito, setEstadoModalCarrito] = useState(false);

    const cambiarEstadoModalCarrito = () => {
        setEstadoModalCarrito(!estadoModalCarrito);
    };

    const AddItemToCart = (idProduct) => {

        setCurrentCart(prevCart =>{
            const productoExiste = prevCart.find(item => item.id === idProduct);
            if(productoExiste){
                return prevCart.map( item => 
                    item.id === idProduct?{...item,cantidad: item.cantidad + 1} //spread operator con una modificación
                    :item
                );
            }else{
                return [...prevCart,{ id:idProduct , cantidad:1}];
            }
        });
    }

    const DeleteItemInCart = (idProduct) => {
        setCurrentCart(prevCart=>
            ( 
                prevCart.map(item=>
                    (item.id===idProduct) ? {...item, cantidad: item.cantidad - 1} : item
                ).filter(item => item.cantidad>0)
            )
        );
    };

    const DeleteAllCart = ()=>{
        setCurrentCart([]);
        localStorage.removeItem("currentCart");
    }

    useEffect(()=>{

        if(!newSession){return localStorage.setItem("currentCart",JSON.stringify(currentCart));}
    
        const memCartData = localStorage.getItem("currentCart");

        if(memCartData){
            try {
                const memCartObject = JSON.parse(memCartData);
                setCurrentCart(memCartObject);
            } catch (error) {
                console.log("Error en la conversión.");
            }
        }
        setNewSession(false);

    },[currentCart]);


    const value = {currentCart, AddItemToCart, DeleteItemInCart, DeleteAllCart, estadoModalCarrito, cambiarEstadoModalCarrito};

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
