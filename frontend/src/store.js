import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer,  product_UD_Reducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { authReducer, userReducer, forgotPasswordReducer,allUsersReducer, userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'


const reducer = combineReducers({
           products:productReducer,
           productDetails: productDetailsReducer,
           newProduct: newProductReducer,
           auth: authReducer,
           user:userReducer,
           allUsers: allUsersReducer,
           userDetails: userDetailsReducer,
           forgotPassword:forgotPasswordReducer,
           cart: cartReducer,
           newOrder:newOrderReducer,
           myOrders:myOrdersReducer,
           allOrders: allOrdersReducer,
           orderDetails:orderDetailsReducer,
           order : orderReducer,
           newReview:newReviewReducer,
           productReviews: productReviewsReducer,
           review: reviewReducer,
           product_UD: product_UD_Reducer

})
let initialState ={
    cart:{
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : []
    }
}
const middleware =[thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;