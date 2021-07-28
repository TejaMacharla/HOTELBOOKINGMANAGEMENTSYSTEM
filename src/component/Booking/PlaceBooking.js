import React,{Component} from 'react'
const PlaceUrl=" http://localhost:1700/orders"

class PlaceBooking extends Component{
    constructor(props){
        super(props)
        this.state={
            id:Math.floor(Math.random()*10000),
            hotel_name:this.props.match.params.hotel_name,
            name:'',
            email:'',
            phone:'',
            cost:sessionStorage.getItem('cost')


        }
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=()=>{
        console.log(this.state)
        sessionStorage.setItem('bid',this.state.id)
        sessionStorage.setItem('name',this.state.name)
        sessionStorage.setItem('hotelname',this.state.hotel_name)
        
        fetch(PlaceUrl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                "Content-type":'application/json'

            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push('/userBookingDetails'))
    }
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        return(
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">Booking Form</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label> Order ID</label>
                            <input name='id' className="form-control" value={this.state.id} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Hotel Name</label>
                            <input name='hotel_name' className="form-control" value={this.state.hotel_name} readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input name='name' className="form-control" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name='email' className="form-control" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input name='phone' className="form-control" value={this.state.phone} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Cost</label>
                            <input name='cost' className="form-control" value={this.state.cost} readOnly/>
                        </div>
                        <btn className="btn btn-success" onClick={this.handleSubmit}>Submit</btn>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default PlaceBooking