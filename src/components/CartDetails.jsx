import React, { useEffect, useState } from "react";
import "./cartStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, emptyCart, minusItem, removeItem } from "../redux/features/CartSlice";
import toast from 'react-hot-toast';
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";


function CartDetails() {

  const {carts}=useSelector((state)=>state.allCart);

  const [totalPrice,setTotalprice]=useState(0);
  const [totalQuant,setTotalQuant]=useState(0);
  const dispatch= useDispatch();

  const handelOnInc=(e)=>{
    dispatch(addToCart(e));
  }
 const handelOnDec=(e)=>{
 dispatch(minusItem(e));

 }
 const handelOnDelete=(e)=>{
  dispatch(removeItem(e));
  toast.success("Item Removed From Cart ")
 }
 const handelOnEmptyCart=()=>{
  dispatch(emptyCart());
  toast.success("All Items Removed from Cart")
 }

 const total=()=>{
  let totalPrice=0;
  carts.map((item,index)=>{
    totalPrice=item.price * item.qnty + totalPrice; 
  });
  setTotalprice(totalPrice);
   }

   const quntCount=()=>{
    let totalQuant=0;
    carts.map((item,index)=>{
      totalQuant= item.qnty + totalQuant; 
    });
    setTotalQuant(totalQuant);
     }

   useEffect(()=>{
    total()
   },[total])
  
   useEffect(()=>{
    quntCount()
   },[quntCount])

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails"></div>
        <div className="card">
          <div className="card-header bg-dark p-3">

            <div className="card-header-flex">
            <h5 className="text-white m-0">cart Calculation</h5>
            {
            carts.length > 0 ? (
              <button className="btn btn-danger mt-0 btn-sm" onClick={()=>handelOnEmptyCart()}>
                <i className="fa fa-trash-alt mr-2"></i>
                <span>Empty Cart</span>
              </button>
            ) : (
              ""
            )
            }
            </div>
           
          </div>
          <div className="card-body p-0">
            {
              carts.length ===0? <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                      <i className="fa fa-shopping-cart"></i>
                       <p>Your cart is Empty</p>

                       <NavLink to="/" className="text-decoration-none text-light mx-2">
                       <Button style={{ width: "150px", background: "#ff3054db", border: "none" }} variant='outline-light'
                                className='mt-2 mb-2' >Add Item to Cart</Button>
                       </NavLink>
                 
                      </div>
                    </td>
                    </tr>
                  </tbody>
              </table>:<table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quant</th>
                    <th className="text-right"><span id="amount" className="amount">Total Amount</span></th>
                  </tr>
                </thead>
                <tbody>
               {
                   carts.map((data,index)=>{
                    return (
                      <tr key={index}> 
                      <td>
                        <button className="prdct-delete" onClick={()=>handelOnDelete(data.id)}>
                        <i className="fa fa-trash-alt "></i>
                        </button>
                      </td>
                      <td>
                        <div className="product-img">
                          <img src={data.imgdata} alt="" />
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          <p>{data.dish}</p>
                        </div>
                      </td>
                      <td>{data.price}</td>
                      <td>
                        <div className="prdct-qty-container">
                          <button className='prdct-qty-btn' type="button" onClick={data.qnty===1?()=>handelOnDelete(data.id):()=>handelOnDec(data)}>
                            <i className="fa fa-minus"></i>
                          </button>
                          <input type="text" className='qty-input-box' value={data.qnty} disabled/>
                          <button className='prdct-qty-btn'  type="button" onClick={()=>handelOnInc(data)}>
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-right">{data.price * data.qnty}</td>

                      </tr>
                    )
                   })
               }
                </tbody>
                <tfoot>
                  <tr>
                  <th>&nbsp;</th>
                  <th colSpan={3}>&nbsp;</th>
                  <th>Items In Cart <span className="ml-2 mr-2">:</span><span className="text-danger">{totalQuant}</span></th>
                  <th className="text-right">Total Price<span className="ml-2 mr-2">:</span><span className="text-danger">{totalPrice}</span></th>

                  </tr>
                </tfoot>

              </table>
            }
          </div>

        </div>
      </div>
    </>
  );
}

export default CartDetails;
