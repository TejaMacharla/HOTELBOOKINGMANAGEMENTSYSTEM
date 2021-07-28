import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class UserBookingDetails extends Component{
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        return(
            <div className="panel panel-success">
                <div className="panel-heading">
                    Booking Details
                </div>
                <div className="panel-body">
                <div class="jumbotron">
                <div class="alert alert-success" role="alert">
               <p className="alert-link"> Well done! You Successfully Booked Your Hotel.
               </p>
               </div>
               <div className="alert alert-info" role="alert">
               <p className="alert-link"><u>Your Booking Details:</u><br/>ID: {sessionStorage.getItem('bid')}<br/>Name: {sessionStorage.getItem('name')}<br/>Hotel Name: {sessionStorage.getItem('hotelname')}<br/>Cost: {sessionStorage.getItem('cost')}
               </p>
               <Link className="btn btn-danger" to="/">OK</Link>

                </div>
                   
               
            </div>
                </div>
    
            </div>
        )
    }
    
}
export default UserBookingDetails