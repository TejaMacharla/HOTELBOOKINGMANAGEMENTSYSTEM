import React, { Component } from 'react';
import './About.css'
class About extends Component{
    render(){
       
        return(
            <div class="panel panel-primary" id='pn'>
      <div class="panel-heading">
        <h3 class="panel-title">Hotel Booking Management System</h3>
      </div>
      <div class="panel-body">
      <div class="row">
      <div class="col-md-2"><span className='about border  border-2 rounded-circle'>ABOUT US</span></div>
      <div class="col-md-10"><span  className='about1'>BY REFERRAL ONLY</span><br/>
    
    <div className="ab"><span className="about3">The project <span className='about2'>“Hotel Booking Management System”</span>  is aimed to develop to maintain the day-to-day state of
    admission/vacation of residents, List of workers, List of Bills etc.
    There are following main objectives of the hotel:</span></div>
    <div><span className='about3'><ul><li>Keeping user satisfaction as at most priority.</li>
    <li>Scheduling the allotment of user with room to make it convenient for user.</li>
    <li>Keeping records of user registration details accurately arranged order so that the treatment of
    Customers becomes quick and satisfactory.</li>
    <li>Keeping details about the users, their needs and payment detail reports etc.</li>
    <li> Keeping the best hotel facilities.</li></ul>
    </span></div>
    </div>
      </div>
    </div>
    </div>
        )
    }
    
}
export default About