import React from 'react'
import axios from 'axios'
import api from '../common/url'
import swal from 'sweetalert'
import MovieForm from './movieForm'

class MovieAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            actorList:[]
        }
    }
    handleSubmit=(FormData)=>{
        console.log(api)
        axios.post(`${api}/movies/new`,FormData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.error){
                swal('Enter Details Correctly',"error")
            }else{
                swal('Producer Added Successfully',"success")
                //window.location.reload()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    handleFormSubmit=(formData)=>{
        axios.post(`${api}/actors/new`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
            
        })
        .then((response)=>{
            if(response.data.errors){
                swal(response.data.message)
            }else{
                axios.get(`${api}/actors`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })  
                .then((response)=>{
                    const actorList=response.data
                    this.setState({actorList})
                    swal('Actorssss Added Successfully')
                }).catch((err)=>{
                    console.log(err)
                })    
            }
            
        })
        .catch(err=>{
           swal(err)
        })
        }
    render(){
        return(
            <React.Fragment>
                <div className="container" >
                <h3>Add Movies</h3>
                <MovieForm handleSubmit={this.handleSubmit} handleFormSubmit={this.handleFormSubmit} actorList={this.state.actorList}/>
                </div>
            </React.Fragment>
        )
    }
}
export default MovieAdd