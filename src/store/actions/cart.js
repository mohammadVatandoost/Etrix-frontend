import * as actionTypes from './actionTypes';
import axios from 'axios';
import URLS from '../../URLs';
import { isArray, isObject } from '../utility';

export const addToCart = (productName, number, price, projectName) => {
    // console.log("addToCart action");console.log(productName);console.log(number);console.log(price);console.log(projectName);
    return {
       type: actionTypes.ADD_TO_CART,
       productName: productName, number: number, price: price, projectName: projectName
    }
}

export const removeFromCart = (productName,projectName) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        keyword: productName, projectName: projectName
    }
}

export const removeAllCart = () => {
    return {
        type: actionTypes.REMOVE_ALL_FROM_CART
    }
}

export const changeNumFromCart = (productName,number,category) => {
    return {
        type: actionTypes.REMOVE_ALL_FROM_CART,
        productName: productName, number: number, category: category
    }
}

export const getCartFromLocalStorage = (token) => {
    let cart = localStorage.getItem('cart');
    let cartLength = 0;
    // console.log("getCartFromLocalStorage");console.log(cart);console.log(cart.length);
    if(cart != null) {
        cart = JSON.parse(cart);
        if(cart.length > 0 ) {
            for(let i=0;i<cart.length;i++) {
                // console.log(i+" : " + cart[i].length);
                cartLength = cartLength + cart[i].length;
            }
        }
        return {
            type: actionTypes.GET_CART_FROM_LOCALSTORAGE,
            cart: cart, cartLength: cartLength
        }
    } else {
        return {
            type: actionTypes.GET_CART_FROM_LOCALSTORAGE,
            cart: [], cartLength: cartLength
        }
    }
}

export const getCartFromServer = (token) => {
    return dispatch => {
        dispatch(setLoadingAndError(true, null));
        // console.log("getCartFromServer");
        axios.post(URLS.base_URL+URLS.user_cart_read, {token: token})
            .then(response => {
                dispatch(setLoadingAndError(false, null));
                let cartNumber = 0;
                // console.log("action2 getCartFromServer cartNumber");console.log(cartNumber);
                // console.log("action2 getCartFromServer response");console.log(URLS.base_URL+URLS.user_cart_read);console.log(response);
                // console.log(response.data);
                let cart = response.data;
                if(isArray(cart)) {
                    console.log("action2 getCartFromServer response is array");
                    for (let j = 0; j < cart.length; j++) {
                        // console.log("action2 getCartFromServer for " + j );
                        // console.log(response.data[j].length);
                        cartNumber = cartNumber + cart[j].length;
                    }
                } else if(isObject(cart)) {
                    // console.log("action2 getCartFromServer response is object");
                    let tempCart = [];
                    Object.keys(cart).map((property) => {
                        tempCart.push(cart[property])   ;
                    });
                    // console.log(tempCart);
                    cart = tempCart;
                    for (let j = 0; j < cart.length; j++) {
                        // console.log("action2 getCartFromServer for " + j );
                        // console.log(response.data[j].length);
                        cartNumber = cartNumber + cart[j].length;
                    }
                }
                // response.data.map((project, i) => {
                //     cartNumber = cartNumber + project.length;
                //     return;
                // });
                // console.log("action2 getCartFromServer cartNumber");console.log(response.data.length);
                dispatch(getCartSuccess(cart, cartNumber));
            })
            .catch(err => {
                // console.log("getCartFromServer err");console.log(err);
                // Alert.error('دوباره امتحن کنید', {
                //     position: 'bottom-right',
                //     effect: 'scale',
                //     beep: false,
                //     timeout: 3000,
                //     offset: 100
                // });
                dispatch(setLoadingAndError(false, err));
            });
    }
}

export const getCartSuccess = (cart,cartLength) => {
    // console.log("action getCartSuccess");
    return {
        type: actionTypes.GET_CART_FROM_SERVER,
        cart: cart, cartLength: cartLength
    }
}

export const setLoadingAndError = (loading,error) => {
    return {
        type: actionTypes.SET_LOADING_AND_ERROR,
        loading: loading, error: error
    }
}

export const restoreCart = (response) => {
    return dispatch => {
                let cartNumber = 0;
                response.data.map((project, i) => {
                    cartNumber = cartNumber + project.length;
                });
                dispatch(getCartSuccess(response.data, cartNumber));
    }
}

export const sendCartToServer = (cart,token) => {
    return dispatch => {
        console.log("cart action sendCartToServer");
        console.log(cart);
        if (cart !== null) {
            if (cart.length > 0) {
                axios.post(URLS.base_URL + URLS.send_cart_to_server, {cart: cart, token: token})
                    .then(response => {
                        console.log("cart action sendCartToServer is done");
                        console.log(response);
                        // console.log(token);
                        dispatch(getCartFromServer(token));
                    })
                    .catch(err => {
                        console.log("sendCartToServer err");
                        // console.log(cart);
                        // console.log(token);
                        console.log(err);
                        // Alert.error('دوباره امتحن کنید', {
                        //     position: 'bottom-right',
                        //     effect: 'scale',
                        //     beep: false,
                        //     timeout: 3000,
                        //     offset: 100
                        // });
                    });
            }
        }
    }
}

export const updateCart = (token) => {
    return dispatch => {
        let cart = localStorage.getItem('cart');
        let cartLength = 0;
        console.log("updateCart");console.log(cart);
        if(token !== null) {
            console.log("token is not null");
            if (cart !== null) {
                console.log("Cart is not null");
                cart = JSON.parse(cart);
                if (cart.length > 0) {
                    for (let i = 0; i < cart.length; i++) {
                        // console.log(i+" : " + cart[i].length);
                        cartLength = cartLength + cart[i].length;
                    }
                    dispatch(sendCartToServer(cart, token));
                    // dispatch(getCartSuccess(cart, cartLength));
                }
            } else {
                console.log("Cart is  null");
                dispatch(getCartFromServer(token));
            }
        } else {
            console.log("token is  null");
            if (cart !== null) {
                console.log("Cart is not null");
                cart = JSON.parse(cart);
                if (cart.length > 0) {
                    for (let i = 0; i < cart.length; i++) {
                        // console.log(i+" : " + cart[i].length);
                        cartLength = cartLength + cart[i].length;
                    }
                }
                dispatch(getCartSuccess(cart, cartLength));
            } else {
                console.log("Cart is  null");
            }
        }
    }
}

export const updateCartPrices = () => {
    return {
        type: actionTypes.UPDATE_CART_PRICES,
    }
}

export const addProductPrice = (productName, productPrice) => {
    return dispatch => {
        // console.log("addProductPrice reducer");
        // console.log(productName);console.log(productPrice);
        dispatch(updateProductPrice(productName, productPrice));
        dispatch(updateCartPrices());
    }
}

export const updateProductPrice = (productName, productPrice) => {
    return {
        type: actionTypes.ADD_PRODUCT_PRICE,
        productName: productName, productPrice: productPrice
    }
}

export const getProductCategories = () => {
    // console.log("cart action getProductCategories");
    return dispatch => {
        let url = URLS.base_URL + URLS.get_products_category;
        axios.get(url)
            .then(response => {
                // console.log("cart action getProductCategories done");
                // console.log(response);
                dispatch(storeProductCategories(response.data))
            })
            .catch(err => {
                console.log("cart action getProductCategories error");console.log(err);
            });
    }
}

export const storeProductCategories = (categories) => {
    return {
        type: actionTypes.GET_CATEGORIES,
        categories: categories
    }
}

export const changeNumProductCart = (productName,number,projectName) => {
    return {
        type: actionTypes.USER_CHANGE_PRODUCT_NUM_CART,
        productName: productName, number: number, projectName: projectName
    }
}
