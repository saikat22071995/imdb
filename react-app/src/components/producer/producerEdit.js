import React from 'react'
import axios from 'axios'
import ProducerForm from './producerForm'
import api from '../common/url'

class ProducerEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            producer:{}
        }
    }

    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`${api}/producers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const producer=response.data
            this.setState({producer})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleSubmit=(formData)=>{
        
        axios.put(`${api}/producers/edit/${this.state.producer._id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.error){
                alert('Enter Details correctly')
            }
            else{
                alert('Updated Successfully')
            }
        })
    }
    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <h3>Edit Producer</h3>
                    {Object.keys(this.state.producer).length!==0 &&
                    <ProducerForm {...this.state.producer} handleSubmit={this.handleSubmit}/>}
                </div>
            </React.Fragment>
        )
    }
}
export default ProducerEdit