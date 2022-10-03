import { createContext, useContext, useState, useReducer } from 'react';

export const shoppingCartContext = createContext();

export const useShoppingCart = () => useContext(shoppingCartContext);

const INITIAL_STATE = {
    items: []
}

const reducer = (state, action) => {

    const type = action.type;
    const prevState = { ...state };


    if (type === 'REMOVE_ITEM') {
        const filtered = prevState.items.filter(item => item.id !== action.payload.id);
        prevState.items = filtered;
    } else if (type === 'ADD_ITEM') {

        const productFound = prevState.items.find((cartItem) => cartItem.id === action.payload.item.id);

        if (productFound) {
            // we want to return the exact same shopping cart.
            // Except that we want to update the quantity and total.
            const newShoppingCart = prevState.items.map((cartItem) => {
                if (cartItem.id === productFound.id) {
                    const newItemQuantity = cartItem.quantity + 1;
                    return {
                        ...cartItem,
                        quantity: newItemQuantity,
                        total: newItemQuantity * cartItem.price,
                    };
                }

                return cartItem;
            });

            prevState.items = newShoppingCart;
        } else {
            // if we don't find the product, we want to add it to the shopping cart for the first time.
            const newCartItem = { ...action.payload.item, quantity: 1, total: action.payload.item.price };
            const items = [...prevState.items, newCartItem];
            prevState.items = items;
        }

    } else if (type === 'EMPTY') {
        prevState.items = [];
    } else {
        // do nothing;
    }
    return prevState;
}

function ShoppingCartContextProvider(props) {
    const { children } = props;

    // Shopping cart
    const shoppingCartInitialState = [];

    const [shoppingCart, setShoppingCart] = useState(shoppingCartInitialState);

    const [spCartState, dispatch] = useReducer(reducer, INITIAL_STATE)


    console.log('shopping cart state: ', shoppingCart);

    const addToCart = (productData) => {
        // // Check if the product already exist in the shopping cart
        // const productFound = shoppingCart.find((cartItem) => cartItem.id === productData.id);

        // if (productFound) {
        //     // we want to return the exact same shopping cart.
        //     // Except that we want to update the quantity and total.
        //     const newShoppingCart = shoppingCart.map((cartItem) => {
        //         if (cartItem.id === productFound.id) {
        //             const newItemQuantity = cartItem.quantity + 1;
        //             return {
        //                 ...cartItem,
        //                 quantity: newItemQuantity,
        //                 total: newItemQuantity * cartItem.price,
        //             };
        //         }

        //         return cartItem;
        //     });

        //     setShoppingCart(newShoppingCart);
        // } else {
        //     // if we don't find the product, we want to add it to the shopping cart for the first time.
        //     const newCartItem = { ...productData, quantity: 1, total: productData.price };
        //     setShoppingCart([...shoppingCart, newCartItem]);
        // }

        dispatch({
            type: 'ADD_ITEM',
            payload: { item: productData }
        })
    };

    const removeFromCart = (productId) => {
        // remove item from cart that match the product id.
        // we currently do not support lowering the quantity.
        // setShoppingCart(shoppingCart.filter((cartItem) => cartItem.id !== productId));

        dispatch({ type: 'REMOVE_ITEM', payload: { id: productId } })
    };

    const emptyCart = () => dispatch({
        type: 'EMPTY',

    })

    const cartItems = spCartState.items;
    return (
        <shoppingCartContext.Provider value={{
            cartItems, addToCart, removeFromCart, emptyCart,
        }}
        >
            {children}
        </shoppingCartContext.Provider>
    );
}

export default ShoppingCartContextProvider;