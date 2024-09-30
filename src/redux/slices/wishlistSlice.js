import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name : 'wishlist',
    initialState:[],
    reducers:{
        // add product to whishlist,component musst pass entire product object
        addToWishlist : (state,productByComponentAction)=>{
            state.push(productByComponentAction.payload)
        },
        // remove product from wishlist,component must pass product id
        removeWishlistItem : (state,productByComponentAction)=>{
            return state.filter(item=>item.id!=productByComponentAction.payload)
        }
    }
})

export const {addToWishlist,removeWishlistItem} = wishlistSlice.actions

export default wishlistSlice.reducer