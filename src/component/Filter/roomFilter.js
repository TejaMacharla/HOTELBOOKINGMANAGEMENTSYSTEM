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