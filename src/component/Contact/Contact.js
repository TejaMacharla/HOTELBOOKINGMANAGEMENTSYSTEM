import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import "./Contact.css"
const contactURL="http://localhost:1999/comments"
class Contactus extends Component{
    constructor(props){
        super(props)
        this.state={
            id:Math.floor(Math.random()*10000),
            name:'',
            email:'',
            text:''


        }
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=()=>{
        console.log(this.state)
        fetch(contactURL,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                "Content-type":'application/json'

            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push('/submit'))
    }
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        return(
            <div class="panel panel-primary" id='pn'>
      <div class="panel-heading">
        <h3 class="panel-title">Hotel Booking Management System</h3>
      </div>
      <div class="panel-body">
      <div class="row">
      <div class="col-md-2"><span className='about'>Contanct Us</span></div>
      <div class="col-md-10"><span  className='about3'>Thanks for visiting our site. Please take a moment to fill out this form and we will get back to you – usually in less than 24 hours.</span><br/>
      <div className="form-group mt-3">
      <label> ID</label>
      <input name='id' className="form-control" value={this.state.id} readOnly/>
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
                            <label>Message</label>
                            <input name='text' className="form-control" value={this.state.text} onChange={this.handleChange}/>
                        </div>
    
                        <btn className="btn btn-success" onClick={this.handleSubmit}>Submit</btn>
    
    
    </div>
      </div>
    </div>
    </div>
        )

    }
    
}
export default Contactus