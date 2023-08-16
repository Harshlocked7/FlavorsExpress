import React from 'react'

export default function Card() {
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
                        <h5 className="card-title">Chicken Tikka</h5>
                        <p className="card-text">Food description</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded'>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  bg-success rounded'>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <div className='d-inline h-100 fs-5'>Total Price</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
