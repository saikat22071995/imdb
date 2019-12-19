import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import api from '../common/url'
class ProducerList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            producers:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3025/producers',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const producers=response.data
            console.log(producers)
            this.setState({producers})
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
                axios.delete(`${api}/producers/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    this.setState((prevState)=>{
                        return{
                            producers:prevState.producers.filter(producer=>producer._id!==id)
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
                <br />
                <div className="container">
                <h3>Listing Producers-{this.state.producers.length}</h3>
                <div>
                <p><Link className="btn btn-primary" to="/producers/new">Add Producers</Link></p>
                </div>
                <div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Bio</th>
                            <th>DOB</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.producers.map((producer,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{producer.name}</td>
                                        <td>{producer.sex}</td>
                                        <td>{producer.bio}</td>
                                        <td>{producer.dob}</td>
                                        <td><Link to={`/producers/edit/${producer._id}`} 
                                        className="btn btn-primary">Edit</Link></td>
                                        <td><button className="btn btn-danger" onClick={()=>{
                                            this.handleRemove(producer._id)
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

export default ProducerList