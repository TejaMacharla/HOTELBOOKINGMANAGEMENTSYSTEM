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