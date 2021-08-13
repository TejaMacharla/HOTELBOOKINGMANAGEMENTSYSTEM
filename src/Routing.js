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
import About from './component/About/About'
import Contactus from './component/Contact/Contact'
import SubmitResponse from './component/Contact/SubmitResponse'
import ContactApi from './component/Contact/ContactApi'
 
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
        <Route path="/about" component={About}/>
        <Route path="/contactus" component={Contactus}/>
        <Route path="/submit" component={SubmitResponse}/>
        <Route path="/contactview" component={ContactApi}/>
        <Footer/>
        </BrowserRouter>
    )
}
export default Routing;