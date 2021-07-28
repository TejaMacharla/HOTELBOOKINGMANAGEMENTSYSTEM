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
