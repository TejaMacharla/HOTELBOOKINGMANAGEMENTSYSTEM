import React from 'react'
import {Link} from 'react-router-dom'
import'./QuickSearch.css'
const QuickDisplay=(props)=>{
   // console.log(props)
const renderTrip=({tripdata})=>{
    if(tripdata){
        return tripdata.map((item)=>{
            return(
                <Link to={`/listing/${item.trip}`}>
                <div className="tileContainer">
                    <div className="tileComponent1"><img src={item.image}/></div>
                    <div className="tileComponent2">
                        <div className="componentHeading">{item.name}</div>
                        <div className="componentSubHeading">Start Your {item.name} Trip With Us</div>
                    </div>
                </div>
                </Link>
            )
        })
    }

}

    return(
        <div className="quickSearchContainer">
            <p className="quickSearchHeading">QuickSearch</p>
            <p className="quickSearchSubHeading">Discover Trip by Type</p>
            <br/>
            {renderTrip(props)}
        </div>
    )

}
export default QuickDisplay