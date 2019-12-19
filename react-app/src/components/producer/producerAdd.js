import React from 'react'
import axios from 'axios'
import ProducerForm from './producerForm'
import api from '../common/url'
import swal from 'sweetalert'

class ProducerAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    handleSubmit=(FormData)=>{
        console.log(api)
        axios.post(`${api}/producers/new`,FormData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.error){
                swal('Enter Details Correctly',"error")
            }else{
                swal('Producer Added Successfully',"success")
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
                <h3>Add Producer</h3>
                <ProducerForm handleSubmit={this.handleSubmit}/>
                </div>
            </React.Fragment>
        )
    }
}
export default ProducerAdd