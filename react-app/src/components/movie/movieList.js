import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import api from '../common/url'
import swal from 'sweetalert'


class MovieList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movies:[]
        }
    }

    componentDidMount(){
        axios.get(`${api}/movies`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const movies=response.data
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
                axios.delete(`${api}/movies/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    this.setState((prevState)=>{
                        return{
                            movies:prevState.movies.filter(producer=>producer._id!==id)
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
    render(){
        return(
            <React.Fragment>
                <div className="container"><br />
                <h3>Listing Movies-{this.state.movies.length}</h3>
                <div>
                <p><Link to="/movies/new" className="btn btn-primary">Add Movies</Link></p>
                </div>
                <div>
                    {
                        this.state.movies.length!==0?<table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Year OF Release</th>
                                <th>Plot</th>
                                <th>Poster</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.movies.map((movie,index)=>{
                                    //const url = `http://localhost:3025/${movie.poster}`
                                    return(
                                        <tr key={index}>
                                            <td>{movie.name}</td>
                                            <td>{movie.year_of_release}</td>
                                            <td>{movie.plot}</td>
                                            <td><img src={`http://localhost:3025/${movie.poster}`} alt="" width="50" height="50" /></td>
                                            <td><Link className="btn btn-primary" to={`/movies/edit/${movie._id}`}>Edit</Link></td>
                                            <td><button className="btn btn-danger"
                                            onClick={()=>{
                                                this.handleRemove(movie._id)
                                            }}>Remove</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>:<b>No Data Available</b>
                    }
                
                </div>
                </div>
            </React.Fragment>
        )
    }
}
export default MovieList