import React, { Component } from 'react'
import QuickDisplay from './QuickDisplay'
const tripUrl='https://developerfunnel.herokuapp.com/booking'
class QuickSearch extends Component{
    constructor(){
        super()
        this.state={
            triptype:''
        }
    }
    render(){
        return(
            <QuickDisplay tripdata={this.state.triptype}/>
        )
    }
    componentDidMount(){
        fetch(tripUrl,{method:'GET'})
        .then((res)=>res.json())
        .then((data)=>{this.setState({triptype:data})})
    }
}
export default QuickSearch