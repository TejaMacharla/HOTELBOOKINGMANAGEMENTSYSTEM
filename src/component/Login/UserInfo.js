import React from 'react';

const UserInfo = (props) => {
    
    const renderUser = ({userdata}) => {
        
        if(userdata){
            
            return userdata.map((item,index) => {
                return(
                    <tr>
                        <td>{index}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                    </tr>
                )
            })
        }
    
    }
    
    return(
        <div className="container">
            <center>
                <h2>List Of Users</h2>
            </center>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {renderUser(props)}
                </tbody>

            </table>
        </div>
    )
}



export default UserInfo;