import {createSlice} from "@reduxjs/toolkit"
const initialstate={
    carts:[]
}

const CartSlice= createSlice({
    name:"cartslice",
    initialState:initialstate,
    reducers:{
        addToCart:(state,action)=>{
            const itemIndex =state.carts.findIndex((item) => item.id === action.payload.id)
            if(itemIndex >=0){
                state.carts[itemIndex].qnty +=1
            }
            else{
                const temp={...action.payload, qnty:1}
                state.carts = [...state.carts , temp]
            }
        }, 
        emptyCart(state,action){
            state.carts=[]
        },
        removeItem(state,action){
           const data= state.carts.filter((item)=>item.id !== action.payload)
           state.carts=data
        },
        minusItem(state,action){
            const itemIndex =state.carts.findIndex((item) => item.id === action.payload.id)
            if(itemIndex >=0 && state.carts[itemIndex].qnty>0 ){
                state.carts[itemIndex].qnty -=1
            }
           
        
        }
        


    }
}
  
)

export const {addToCart , emptyCart, removeItem,minusItem}= CartSlice.actions;
export default CartSlice.reducer;