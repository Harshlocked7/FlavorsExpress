import React from 'react'

export default function Card(props) {

    let options = props.options;
    let priceOptions = Object.keys(options)
    const handleAddToCart = () => {

    }

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16.6rem", "maxHeight": "350px" }}>
                    <img
                        src={props.imgSrc}
                        className="card-img-top"
                        alt="..."
                        style={{ objectFit:'fill', height: '200px' }} // Adjust the width and height as needed
                    />

                    <div className="card-body">
                        <h5 className="card-title">{props.foodname}</h5>
                      
                            <select className='m-2 h-100 bg-success rounded'>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded'>
                               {priceOptions.map((data)=> {
                                return <option key={data} value={data}>{data}</option>
                               })}
                            </select>
                            <div className='d-inline h-100 fs-6'>Total Price</div>
                        
                        <hr></hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
