import React,{Component} from 'react'
import axios from 'axios'
import ContactView from './ContactView'
const contactUrl="http://localhost:1999/comments"

class ContactApi extends Component{
    constructor(){
        super()
        this.state={
            contact:''
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
            <ContactView contactdata={this.state.contact}/>
        )
    }
    componentDidMount(){
        axios.get(contactUrl)
        .then((res)=>{this.setState({contact:res.data})})

    }
}
export default ContactApi;
