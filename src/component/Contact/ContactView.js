import React from 'react'

const ContactView=(props)=>{
    
    const renderView=({contactdata})=>{
        if(contactdata){
            return contactdata.map((item)=>{
                return(
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.text}</td>
                    
                </tr>

                )
            })
        }

    }
    return(
        <div className="container">
            <center><h3>Response List</h3></center>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {renderView(props)}
                </tbody>
            </table>
        </div>
    )
}
export default ContactView