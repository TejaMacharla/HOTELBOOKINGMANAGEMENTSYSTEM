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