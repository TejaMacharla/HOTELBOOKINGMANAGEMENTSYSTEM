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
