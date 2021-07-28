import React from 'react'

const ViewBooking=(props)=>{
    
    const renderView=({viewdata})=>{
        if(viewdata){
            return viewdata.map((item)=>{
                return(
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.hotel_name}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>Rs.{item.cost}</td>
                    
                </tr>

                )
            })
        }

    }
    return(
        <div className="container">
            <center><h3>Booking List</h3></center>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Hotel</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {renderView(props)}
                </tbody>
            </table>
        </div>
    )
}
export default ViewBooking