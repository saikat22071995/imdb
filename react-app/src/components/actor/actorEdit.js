import React from 'react'
import axios from 'axios'
import ActorForm from './actorForm'
import api from '../common/url'
import swal from 'sweetalert'

class ActrorEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            actor:{}
        }
    }

    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`${api}/actors/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const actor=response.data
            this.setState({actor})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleSubmit=(formData)=>{
        
        axios.put(`${api}/actors/edit/${this.state.actor._id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.error){
                swal('Enter Details correctly')
            }
            else{
                swal('Updated Successfully')
            }
        })
    }
    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <h3>Edit Actor</h3>
                    {Object.keys(this.state.actor).length!==0 &&
                    <ActorForm {...this.state.actor} handleSubmit={this.handleSubmit}/>}
                </div>
            </React.Fragment>
        )
    }
}
export default ActrorEdit