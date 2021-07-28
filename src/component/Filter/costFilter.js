import React, { Component } from 'react'
import axios from 'axios'

const url='https://developerfunnel.herokuapp.com/hotellist'
class CostFilter extends Component{
    filterCost=(event)=>{
        let cost=(event.target.value).split('-')
       let lcost=cost[0]
       let hcost=cost[1]
        let tripid=sessionStorage.getItem('tripid')
        let CostUrl
        if(cost==""){
            CostUrl=`${url}/${tripid}`
        }else{
            CostUrl=`${url}/${tripid}?hcost=${hcost}&lcost=${lcost}`
        }
        axios.get(CostUrl).then((response)=>{this.props.costPerType(response.data)})
    }
    render(){
        return(
            <React.Fragment>
                <center>Cost Type</center>
                <div onChange={this.filterCost}>
                    <label className="radio">
                    <input type="radio" name="room" value=''/>All
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='1000-3000'/>1000-3000
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='3001-6000'/>3001-6000
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='6001-9000'/>6001-9000
                    </label>
                    <label className="radio">
                    <input type="radio" name="room" value='9001-12000'/>9001-12000
                    </label>
                </div>
            </React.Fragment>
        )
    }
}
export default CostFilter