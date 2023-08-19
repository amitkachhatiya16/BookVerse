import { createContext, useContext, useEffect, useState } from 'react';
// import CartService from '../services/cartService';
import { useAuthContext } from './authContext';
import cartService from '../services/cartService';

const initialState = {
    carData:[],
    updateCart: () => {},
    emptyCart: () => {},
};

export const CartContext = createContext(initialState);

export const CartWrapper = ({children}) => {
    const authContext = useAuthContext();

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        updateCart();
    },[authContext.user.id]);

    const updateCart = (updatedCartList) => {
        if (updatedCartList){
            setCartData(updatedCartList);
        }else if (authContext.user.id) {
            cartService.GetCartList(authContext.user.id).then((res) => setCartData(res));

        }
    };

    const emptyCart = () => {
        setCartData([]);
    };

    let value = {
        cartData,
        updateCart,
        emptyCart,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

};

export const useCartContext = () => {
    return useContext(CartContext);
};