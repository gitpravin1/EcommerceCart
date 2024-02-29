import React from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardData from "./CardData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import toast from 'react-hot-toast';


function Home() {
  const [cartData , setCartData] = useState(CardData);
  const dispatch = useDispatch();

  const send=(e)=>{
    dispatch(addToCart(e))
    toast.success("tem Added To Cart Sucessfully")
  }

  return (
    <>
      <section className="iteam_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 400 }}>
          Restorants in pune open now
        </h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
         { cartData.map((elements,index)=>{
          return (
            
                <Card style={{ width: "22rem", border: "none" }} className='hove mb-4' key={index}>
                    <Card.Img variant='top' className='cd' src={elements.imgdata}/>

                    <div className="card_body">
                        <div className="upper_data d-flex justify-content-between align-items-center">
                            <h4 className='mt-2'>{elements.dish}</h4>
                            <span>{elements.rating}&nbsp;★</span>
                        </div>

                        <div className="lower_data d-flex justify-content-between ">
                            <h5>{elements.address}</h5>
                            <span>₹ {elements.price}</span>
                        </div>
                        <div className="extra"></div>

                        <div className="last_data d-flex justify-content-between align-items-center">
                            <img src={elements.arrimg} className='limg' alt="" />
                            <Button style={{ width: "150px", background: "#ff3054db", border: "none" }} variant='outline-light'
                                className='mt-2 mb-2'
                               
                            onClick={()=>{send(elements)}}>Add TO Cart</Button>
                            <img src={elements.delimg} className='laimg' alt="" />

                        </div>
                    </div>
                </Card>
            
        )
    })

         } 
        </div>
      </section>
    </>
  );
}
export default Home;
