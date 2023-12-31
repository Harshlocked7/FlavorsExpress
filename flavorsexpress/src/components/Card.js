import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart();
    let priceOptions = Object.keys(options);
    const priceRef = useRef();
    // let foodItem = props.foodItems;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const finalPrice = qty * parseInt(options[size]);
    const handleAddToCart = async () => {
        let food = []
        for (const item in data) {
            if (item.id === props.foodItem._id){
            food = item;
            break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: qty * parseInt(options[size]), qty: qty })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: qty * parseInt(options[size]), qty: qty, size: size,img: props.ImgSrc })
              console.log("Size different so simply ADD one more to the list")
              return
            }
            return
          }
      
        // console.log(data)
        await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price: qty * parseInt(options[size]), qty: qty, size: size})
    }
   
    useEffect (() => {
        setSize(priceRef.current.value)
    })
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16.6rem", "maxHeight": "350px" }}>
                    <img
                        src={props.foodItem.img}
                        className="card-img-top"
                        alt="..."
                        style={{ objectFit:'fill', height: '200px' }} // Adjust the width and height as needed
                    />

                    <div className="card-body w-100">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                      
                            <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)} >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded'   ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                               {priceOptions.map((data)=> {
                                return <option key={data} value={data}>{data}</option>
                               })}
                            </select>
                            <div className='d-inline h-100 fs-6'>₹{qty * parseInt(options[size])}</div>
                        
                        <hr></hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
