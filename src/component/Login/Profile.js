import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const url="http://localhost:7800/api/auth/userinfo"

class Profile extends Component{
    constructor(){
        super()
        this.state={
            user:''
        }
    }
    handleLogout=()=>{
        sessionStorage.removeItem('ltk')
        sessionStorage.removeItem('username')
        this.props.history.push('/login')
    }
    conditionalRender=()=>{
        if(this.state.user.role){
            if(this.state.user.role==="Admin"){
                return(<>
                    <Link className="btn btn-success" to="/userinfo" style={{marginRight:"5px"}}>All Users</Link>
                    <Link className="btn btn-success" to="/viewBooking" style={{marginRight:"5px"}}>BookingList</Link>
                    <Link className="btn btn-success" to="/contactview" style={{marginRight:"5px"}}>Response List</Link>
                    </>
                )
            }
        }
    }
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        sessionStorage.setItem('rtk',this.state.user.role)
        sessionStorage.setItem('username',this.state.user.name)
        return(
            <div>
            <div className="panel panel-success">
                <div className="panel-heading">
                   <h3> User Profile</h3>
                </div>
                <div className="panel-body">
                    <h3>Hi {this.state.user.name}</h3>
                    <h3>Your Mail Id is {this.state.user.email}</h3>
                    <h4> Your Role is {this.state.user.role}</h4>
                    {this.conditionalRender()}
                    <btn className="btn btn-danger" onClick={this.handleLogout}>LogOut <span className="glyphicon glyphicon-log-out"></span></btn>
                    
                </div>
            </div>
        </div>
            
        )
    }
    
    componentDidMount(){
        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token': sessionStorage.getItem('ltk')
            }
        })
        .then((res)=>res.json())
        .then((data)=>{this.setState({user:data})})
        

    }
}
export default Profile