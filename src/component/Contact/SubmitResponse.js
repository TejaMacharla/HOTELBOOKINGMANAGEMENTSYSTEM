import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class SubmitResponse extends Component{
    render(){
        if(sessionStorage.getItem('ltk')==null){
            this.props.history.push('/login')
        }
        return(
            <div className="panel panel-success">
                <div className="panel-heading">
                    Submition Response
                </div>
                <div className="panel-body">
                <div class="jumbotron">
                <div class="alert alert-success" role="alert">
               <p className="alert-link"> Your Response is Saved..! The Admin Will Give You FeedBack Soon...! Thank You.
               </p>
               </div>
               <div className="alert alert-info" role="alert">
               <Link className="btn btn-danger" to="/">OK</Link>

                </div>
                   
               
            </div>
                </div>
    
            </div>
        )
    }
    
}
export default SubmitResponse