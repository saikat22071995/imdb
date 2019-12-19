import React from 'react'
import axios from 'axios'
import ActorForm from './actorForm'
import api from '../common/url'
import swal from 'sweetalert'

class ActorAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            actorList:[]
        }
    }
    handleSubmit=(FormData)=>{
        console.log(api)
        axios.post(`${api}/actors/new`,FormData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.error){
                swal('Enter Details Correctly')
            }else{
                swal('Actor Added Successfully')
                window.location.reload()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

   
    render(){
        return(
            <React.Fragment>
                <div className="container" >
                <h3>Add Actor</h3>
                <ActorForm handleSubmit={this.handleSubmit} />
                </div>
            </React.Fragment>
        )
    }
}
export default ActorAdd