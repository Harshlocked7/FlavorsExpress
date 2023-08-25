import React from 'react'

export default function Cart() {
  return (
    <div><div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
            <thead className='text-success fs-4'>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Option</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'></th>
                </tr>
            </thead>
            <tbody>{}</tbody>
        </table>
        {}
        <div>
            <button className='btn bg-success my-5'>Check Out</button>
        </div>
        </div></div>
  )
}
