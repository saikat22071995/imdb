import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import api from '../common/url'
import swal from 'sweetalert'
class ActorList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            actors:[],
            movies:[]
        }
    }

    componentDidMount(){
        axios.get(`${api}/actors`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const actors=response.data
            console.log(actors)
            this.setState({actors})
        })
        .catch((err)=>{
            console.log(err)
        })


        axios.get(`${api}/movies`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const movies=response.data
            console.log(movies)
            this.setState({movies})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleRemove=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`${api}/actors/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    this.setState((prevState)=>{
                        return{
                            actors:prevState.actors.filter(actor=>actor._id!==id)
                        }
                    })
                  swal("Poof! Your Data has been deleted!", {
                    icon: "success",
                  });
                })
               
            } else {
              swal("Your Data is safe!");
            }
          })
    }

    handleMovie(movieId){
        console.log('id',movieId)
        const movie = this.state.movies.find(movie => movie._id == movieId)
        console.log('movie',movie)
        return movie ? movie.name : ''
    }


    render(){
        console.log('mmmm',this.state.movies)
        return(
            <React.Fragment>
                <div className="container"><br />
                <h3>Listing Actors-{this.state.actors.length}</h3>
                <div>
                <p><Link className="btn btn-primary" to="/actors/new">Add Actors</Link></p>
                </div>
                <div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>DOB</th>
                            <th>Bio</th>
                            <th>Movies</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.actors.map((actor,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{actor.name}</td>
                                        <td>{actor.sex}</td>
                                        <td>{actor.dob}</td>
                                        <td>{actor.bio}</td>
                                        {actor.movies.length!==0 ? 
                                        <td>{this.handleMovie(actor.movies)}</td>:<b>Haven't done any movies yet</b>
                                        }
                                        <td><Link to={`/actors/edit/${actor._id}`}
                                        className="btn btn-primary">Edit</Link></td>
                                        <td><button className="btn btn-danger"
                                        onClick={()=>{
                                            this.handleRemove(actor._id)
                                        }}>Remove</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ActorList