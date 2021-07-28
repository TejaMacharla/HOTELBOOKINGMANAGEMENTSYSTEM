indexedDB.html:

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </head>
  <body class="container">
    <div id="root"></div>
  </body>
</html>

index.js:

import React from 'react'
import ReactDom from 'react-dom'
import Routing from './Routing'
ReactDom.render(<Routing/>,document.getElementById('root'))

Routing.js:

import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import Home from './component/Home/Home'
import Header from './Header'
import Footer from './Footer'
import ListingApi from './component/Listing/ListingApi'
import HotelDetails from './component/Detail/HotelDetails'
import PlaceBooking from './component/Booking/PlaceBooking'
import BookingApi from './component/Booking/BookingApi'
import Register from './component/Login/Register'
import Login from './component/Login/Login'
import Profile from './component/Login/Profile'
import UserBookingDetails from './component/Booking/UserBookingDetails'
import UserApi from './component/Login/UserApi'
 
const Routing=()=>{
    return(
        <BrowserRouter>
        <Header/>
        <Route exact path="/" component={Home}/>
        <Route path="/listing/:id" component={ListingApi}/>
        <Route path="/details/:id" component={HotelDetails}/>
        <Route path="/booking/:hotel_name" component={PlaceBooking}/>
        <Route path="/viewBooking" component={BookingApi}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/userBookingDetails" component={UserBookingDetails}/>
        <Route path="/userinfo" component={UserApi}/>
        <Footer/>
        </BrowserRouter>
    )
}
export default Routing;

Header.js :

import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class Header extends Component{
  constructor(){
    super()
    this.state={
      username:''
    }
  }
  
  conditionalHeader = () => {
   if(sessionStorage.getItem('username')!==null){
    return(
      <li>
          <a>
          Hi {sessionStorage.getItem('username')}
          </a>
      </li>
  )
    }else{
      sessionStorage.removeItem('username')
    }
}
render(){
  return(
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        {/* <img class="navbar-brand" src="https://tse2.mm.bing.net/th?id=OIP.dinwxvjJN55OtoM827c2BwHaIg&pid=Api&P=0&w=300&h=300" style={{height:70,width:70}}/> */}
      </div>
      <ul class="nav navbar-nav">
        <li><Link to="/">Home</Link></li>
       
      </ul>
      <ul class="nav navbar-nav navbar-right">
      {this.conditionalHeader()} 
        {/* <li><a href="#">Link</a></li> */}
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><Link to="/register"><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
            <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
            <li><Link to="/profile"><span class="glyphicon glyphicon-user"></span> Profile</Link></li>
            {/* <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li> */}
          </ul>
        </li>
      </ul>
      {/* <ul class="nav navbar-nav navbar-right">
      <li><Link to="/register"><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
      <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
      <li><Link to="/profile"><span class="glyphicon glyphicon-log-in"></span> Profile</Link></li> 
           
  
      </ul> */}
    </div>
  </nav>
)

}
    
}
export default Header;


Footer.js:

import React from 'react'
const Footer=()=>{
    return(
        <div>
            <hr/>
            <center><h2>&copy;Hotel Booking Management System </h2></center>
            
            
        </div>
        
    )
}
export default Footer;

Home.js:

import React from 'react'
import Search from './Search'
import QuickSearch  from './QuickSearch'

const Home=()=>{
    return(
        <div>
        <Search/>
        <QuickSearch/>
        </div>
    )
}
export default Home

Search.js:

import React,{Component} from 'react'
import './Search.css'
import {withRouter} from 'react-router-dom'
const cityUrl='https://developerfunnel.herokuapp.com/location'
const hotelUrl="https://developerfunnel.herokuapp.com/hotels?city="


class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            location:'',
            hotels:''
        }
    }
    renderCity=(data)=>{
        if(data){
            return data.map((item)=>{
                return(
                    <option value={item.city}>{item.city_name}</option>
                )
               
            })
        }

    }
    renderHotel=(data)=>{
        if(data){
            return data.map((item)=>{
                return(
                    <option value={item._id}>{item.name} || {item.locality}</option>
                )
               
            })
        }

    }

    handleCity=(event)=>{
        console.log(event.target.value)
        fetch(`${hotelUrl}${event.target.value}`,{method:'GET'})
        .then((res)=>res.json())
        .then((data)=>{this.setState({hotels:data})})
    }
    handleHotel=(event)=>{
        this.props.history.push(`/details/${event.target.value}`)
    }
    render(){
        console.log(this.props)
        return(
            <div className="imageContainer">
                <div id="logo">M!</div>
                <div className="heading">Trip With Us</div>
                <div className="locationSelector">
                    <select className="locationDropDown" onChange={this.handleCity}>
                        <option>-----SELECT CITY----</option>
                        {this.renderCity(this.state.location)}
                    </select>
                    <select className="reataurantsinput" onChange={this.handleHotel}>
                        <option>-----SELECT HOTEL----</option>
                        {this.renderHotel(this.state.hotels)}
                    </select>
                </div>
            </div>

        )
    }
    componentDidMount(){
        fetch(cityUrl,{method:'GET'})
        .then((res)=>res.json())
        .then((data)=>{this.setState({location:data})})


    }
}
export default withRouter(Search);

QuickSearch.js:


import React, { Component } from 'react'
import QuickDisplay from './QuickDisplay'
const tripUrl='https://developerfunnel.herokuapp.com/booking'
class QuickSearch extends Component{
    constructor(){
        super()
        this.state={
            triptype:''
        }
    }
    render(){
        return(
            <QuickDisplay tripdata={this.state.triptype}/>
        )
    }
    componentDidMount(){
        fetch(tripUrl,{method:'GET'})
        .then((res)=>res.json())
        .then((data)=>{this.setState({triptype:data})})
    }
}
export default QuickSearch

QuickDisplay.js:


import React from 'react'
import {Link} from 'react-router-dom'
import'./QuickSearch.css'
const QuickDisplay=(props)=>{
   // console.log(props)
const renderTrip=({tripdata})=>{
    if(tripdata){
        return tripdata.map((item)=>{
            return(
                <Link to={`/listing/${item.trip}`}>
                <div className="tileContainer">
                    <div className="tileComponent1"><img src={item.image}/></div>
                    <div className="tileComponent2">
                        <div className="componentHeading">{item.name}</div>
                        <div className="componentSubHeading">Start Your {item.name} Trip With Us</div>
                    </div>
                </div>
                </Link>
            )
        })
    }

}

    return(
        <div className="quickSearchContainer">
            <p className="quickSearchHeading">QuickSearch</p>
            <p className="quickSearchSubHeading">Discover Trip by Type</p>
            <br/>
            {renderTrip(props)}
        </div>
    )

}
export default QuickDisplay

ListingApi.js:

import React,{Component} from 'react'
import axios from 'axios'
import ListingDiplay from './ListingDisplay'
import RoomFilter from '../Filter/roomFilter'
import CostFilter from '../Filter/costFilter'
const listUrl="https://developerfunnel.herokuapp.com/hotellist"

class ListingApi extends Component{
    constructor(){
        super()
        this.state={
            list:''
        }
    }
    setDataPerFilter=(sortedData)=>{
        this.setState({list:sortedData})
    }
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        return(
            <div className="row">
                <div className="col-md-2"><RoomFilter roomPerType={(data)=>{this.setDataPerFilter(data)}}/>
                <CostFilter costPerType={(data)=>{this.setDataPerFilter(data)}}/></div>
                <div className="col-md-10"><ListingDiplay listdata={this.state.list}/></div>
            </div>
        )
    }
    componentDidMount(){
        let tripId=this.props.match.params.id
        sessionStorage.setItem('tripid',tripId)
        axios.get(`${listUrl}/${tripId}`)
        .then((res)=>{this.setState({list:res.data})})
    }
}
export default ListingApi


ListingDisplay.js:

import React from 'react'
import {Link} from 'react-router-dom'
import './Listing.css'
const ListingDiplay=(props)=>{
    console.log(props)
    const renderList=({listdata})=>{
        if(listdata){
            if(listdata.length>1){
                return listdata.map((item)=>{
                    return(
                        <div className="item">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <img className="Image" src={item.thumb}/>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="hotel_name">
                                            <Link to={`/details/${item._id}`}>{item.name}</Link>
                                            <div className="city_name">{item.city_name}</div>
                                            <div className="city_name">{item.locality}</div>
                                            <div className="city_name">{item.address}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="cuisine">Room Type</div>
                                        <div className="cuisine">Cost For Night</div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="cuisine_data">
                                            {item.type[0].name}
                                        </div>
                                        <div className="cuisine_data">Rs. {item.cost}</div>
                                    </div>
                                </div>
                        </div>
                    )
                })

            }else{
                return(
                    <div className="item">
                        <h2>No Data Found</h2>
                    </div>
                )
            }
        }else{
            return(
                <div className="item">
                    <img src="/images/loader.gif"/>
                </div>
            )
        }

    }
    return(
        <div className='container-fluid'>
        <div className="main-heading">
            <div className='col-md-12'>
                {renderList(props)}
            </div>
        </div>
    </div>
   
    )
}
export default ListingDiplay


PlaceBooking.js:

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

BookingAp.js:

import React,{Component} from 'react'
import axios from 'axios'
import ViewBooking from './ViewBooking'
const viewUrl="http://localhost:1700/orders"

class BookingApi extends Component{
    constructor(){
        super()
        this.state={
            view:''
        }
    }
    render(){
        if(sessionStorage.getItem('ltk')!==null && sessionStorage.getItem('rtk')!=='Admin'){
            this.props.history.push('/profile')

        }
        return(
            <ViewBooking viewdata={this.state.view}/>
        )
    }
    componentDidMount(){
        axios.get(viewUrl)
        .then((res)=>{this.setState({view:res.data})})

    }
}
export default BookingApi;


ViewBooking.js:

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

HotelDetails.js:


import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
const detailUrl=" https://developerfunnel.herokuapp.com/hotelsdetails"

class HotelDetails extends Component{
    constructor(){
        super()
        this.state={
            details:''
        }
    }
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        let {details}=this.state
        return(
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>{this.state.details.name}</h3>
                    </div>
                    <div className="panel-body">
                        <div className='row'>
                            <div className="col-md-12">
                                <img className="img-responsive" src={details.thumb} style={{height:400,width:1500}}/>
                            </div>
                            <div className="col-md-6">
                                <h3>{details.name}</h3>
                                <h3>{details.locality}</h3>
                                <h3>{details.address}</h3>
                                <h4>{details.cost}</h4>
                            </div>
                        </div>
                        <hr/>
                        <Tabs>
                                <TabList>
                                <Tab>Details</Tab>
                                <Tab>Contact</Tab>
                                </TabList>

                                <TabPanel>
                                <h2>{details.name}</h2>
                                <h5>{details.name} is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a </h5>
                                </TabPanel>
                                <TabPanel>
                                <h2>{details.name}</h2>
                                <h4>Phone no: 123456789</h4>
                                <p>{details.address}</p>
                                </TabPanel>
                            </Tabs>

                        <Link to="/" className="btn btn-danger">Back</Link> &nbsp;
                        <Link to={`/booking/${details.name}`} className="btn btn-success">Proceed</Link>
                    </div>
                </div>
            </div>

        )
    }
    async componentDidMount(){
      let  tripId=this.props.match.params.id
        let response=await axios.get(`${detailUrl}/${tripId}`)
        sessionStorage.setItem('cost',response.data[0].cost)
        this.setState({details:response.data[0]})
    
    }
}
export default HotelDetails

costFilter.js:

import React, { Component } from 'react'
import axios from 'axios'

const url='https://developerfunnel.herokuapp.com/hotellist'
class CostFilter extends Component{
    filterCost=(event)=>{
        let cost=(event.target.value).split('-')
       let lcost=cost[0]
       let hcost=cost[1]
        let tripid=sessionStorage.getItem('tripid')
        let CostUrl
        if(cost==""){
            CostUrl=`${url}/${tripid}`
        }else{
            CostUrl=`${url}/${tripid}?hcost=${hcost}&lcost=${lcost}`
        }
        axios.get(CostUrl).then((response)=>{this.props.costPerType(response.data)})
    }
    render(){
        return(
            <React.Fragment>
                <center>Cost Type</center>
                <div onChange={this.filterCost}>
                    <label className="radio">
                    <input type="radio" name="room" value=''/>All
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='1000-3000'/>1000-3000
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='3001-6000'/>3001-6000
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='6001-9000'/>6001-9000
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='9001-12000'/>9001-12000
                    </label>
                </div>
            </React.Fragment>
        )
    }
}
export default CostFilter

roomFilter.js:

import React, { Component } from 'react'
import axios from 'axios'

const url='https://developerfunnel.herokuapp.com/hotellist'
class RoomFilter extends Component{
    filterRoom=(event)=>{
        let roomid=event.target.value
        let tripid=sessionStorage.getItem('tripid')
        let roomUrl
        if(roomid==""){
            roomUrl=`${url}/${tripid}`
        }else{
            roomUrl=`${url}/${tripid}?roomtype=${roomid}`
        }
        axios.get(roomUrl).then((response)=>{this.props.roomPerType(response.data)})
    }
    render(){
        return(
            <React.Fragment>
                <center>Room Type</center>
                <div onChange={this.filterRoom}>
                    <label className="radio">
                    <input type="radio" name="room" value=''/>All
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='1'/>Deluxe Room
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='2'/>Premium Rooms
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='3'/>Travel
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='4'/>Semi Deluxe Room
                    </label>
                </div>
            </React.Fragment>
        )
    }
}
export default RoomFilter

Register.js:


import React from 'react';
const registerUrl="http://localhost:7800/api/auth/register"
const intialState={
            id:Math.floor(Math.random()*10000),
            name:'',
            phone:'',
            email:'',
            password:'',
            cpassword:'',
            role:'',
            nameError:'',
            emailError:'',
            cpwdError:'',

}
export default class Register extends React.Component{
    state=intialState
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    validate=()=>{
           let nameError="";
            let emailError="";
            let pwd=this.state.password
            let cpwd=this.state.cpassword
           let cpwdError="";
           if(!this.state.name){
               nameError='Name can not be blank'
           }
           if(!this.state.email.includes('@')){
               emailError='Invalid Email'
           }
           if(pwd!==cpwd){
               cpwdError="Confirm password does not match"
             }
           if(emailError || nameError || cpwdError){
               this.setState({emailError,nameError,cpwdError})
               return false
           }
           return true


    }
    handleSubmit=event=>{
       // console.log(this.state)
       event.preventDefault();
       
        const isValid=this.validate();
        if(isValid){
            console.log(this.state)
            //clear form
        this.setState(intialState)
        let name=this.state.name
        fetch(registerUrl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push('/login'))
         sessionStorage.setItem('username',name)
        
        }
        
        
    }
    render(){
        if(sessionStorage.getItem('ltk')!==null){
            this.props.history.push('/profile')
        }
        return(
            
            <div className="container">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        Register
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>User ID</label>
                            <input name="name" value={this.state.id} className="form-control" readOnly
                            
                            />
                            
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input name="name" value={this.state.name} className="form-control"
                            onChange={this.handleChange}
                            />
                            <div style={{color:"red"}}>{this.state.nameError}</div>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input name="phone" value={this.state.phone} className="form-control"
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" value={this.state.email} className="form-control"
                            onChange={this.handleChange}
                            />
                             <div style={{color:"red"}}>{this.state.emailError}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type='password' value={this.state.password} className="form-control"
                            onChange={this.handleChange}
                            />
                             
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input name="cpassword" value={this.state.cpassword} type='password' className="form-control"
                            onChange={this.handleChange}
                            />
                            <div style={{color:"red"}}>{this.state.cpwdError}</div>
                        </div>
                        <button className="btn btn-success" type="submit"
                        >
                            Register
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}



Login.js:


import React,{Component} from 'react';
const loginUrl="http://localhost:7800/api/auth/login"
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            message:''
            

        }
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=()=>{
        console.log(this.state)
        fetch(loginUrl,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.auth==false){
                this.setState({message:data.token})
            }else{
                sessionStorage.setItem('ltk',data.token)
                this.props.history.push("/profile")
            }
        })
    }
    render(){
        if(sessionStorage.getItem('ltk')!==null){
            this.props.history.push('/profile')
        }
        return(
            <div className="container">
                <div className="panel panel-success">
                    <h2 style={{color:'red'}}>{this.state.message}</h2>
                    <div className="panel-heading">
                        Login
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" value={this.state.email} className="form-control"
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type='password' value={this.state.password} className="form-control"
                            onChange={this.handleChange}
                            />
                        </div>
                       
                        
                        <button className="btn btn-success"
                        onClick={this.handleSubmit}>
                            Login
                        </button>
                        <p>If you don't have any account Please <a class="btn btn-primary" href="/register" role="button">Sign Up</a></p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;


Profile.js:

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
                    <Link className="btn btn-success" to="/userinfo">All Users</Link>
                    <Link className="btn btn-success" to="/viewBooking">BookingList</Link>
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
                    <btn className="btn btn-danger" onClick={this.handleLogout}>LogOut</btn>
                    
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


UserApi.js:


import React,{Component} from 'react'
import axios from 'axios'
import UserInfo from './UserInfo'
const url="http://localhost:7800/api/auth/users"
class UserApi extends Component{
    constructor(){
        super()
        this.state={
            users:''
        }
    }
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        if(sessionStorage.getItem('ltk')!==null && sessionStorage.getItem('rtk')!=='Admin'){
            this.props.history.push('/profile')

        }
        return(
            <UserInfo userdata={this.state.users}/>
        )
    }
    componentDidMount(){
        axios.get(url)
        .then((res)=>this.setState({users:res.data}))
    }
}
export default UserApi;

userinfo.js:


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


