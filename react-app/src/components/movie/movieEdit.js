import React from 'react'
import axios from 'axios'
import MovieForm from './movieForm'
import api from '../common/url'
import swal from 'sweetalert'

class MovieEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movie:{}
        }
    }

    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`${api}/movies/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const movie=response.data
            this.setState({movie})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleSubmit=(formData)=>{
        
        axios.put(`${api}/movies/edit/${this.state.movie._id}`,formData,{
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
                    <h3>Edit Movie</h3>
                    {Object.keys(this.state.movie).length!==0 &&
                    <MovieForm {...this.state.movie} handleSubmit={this.handleSubmit}/>}
                </div>
            </React.Fragment>
        )
    }
}
export default MovieEdit