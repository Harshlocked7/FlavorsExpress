import React from 'react'

export default function Card(props) {

    let options = props.options;
    let priceOptions = Object.keys(options)

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16.6rem", "maxHeight": "360px" }}>
                    <img
                        src="https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg"
                        className="card-img-top"
                        alt="..."
                        style={{ width: '330px', height: '200px' }} // Adjust the width and height as needed
                    />

                    <div className="card-body">
                        <h5 className="card-title">{props.foodname}</h5>
                        <div className='container w-100'>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
