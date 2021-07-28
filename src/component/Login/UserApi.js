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