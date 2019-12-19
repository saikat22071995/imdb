import React from 'react'
import axios from 'axios'


class ActorForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
            sex:props.sex?props.sex:'',
            bio:props.bio?props.bio:'',
            dob:props.dob?props.dob:'',
            movieList:[],
            movies:props.movies?props.movies:'',
            user_id:props.user_id?props.user_id:''
        }
    }


    componentDidMount(){
        axios.get('http://localhost:3025/users/account',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const user_id=response.data._id
            this.setState({user_id})
        })
        .catch((error)=>{
            console.log(error)
        })


        axios.get('http://localhost:3025/movies',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            
            const movieList=response.data
           // console.log(movieList)
            this.setState({movieList})
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    // handleChangeDate=(e)=>{
    //    // const dob=moment(e.target.value,"dd-MM-yyyy")
    //    // const date=moment(dob,'DD-MM-YYYY')
        
    // const dob = e.target.value;
    // var result = moment(dob).format('');
    // console.log(dob)
    //     this.setState({dob:result})
    // }

    handleSubmit=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        const formData={
            name:this.state.name,
            sex:this.state.sex,
            bio:this.state.bio,
            dob:this.state.dob,
            movies:this.state.movies,
            user_id:this.state.user_id
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }

    render(){
        console.log('Movies',this.state.movies)
        return(
            <React.Fragment>
                <div className="container">
                    <form className="form -group" onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" value={this.state.name} onChange={this.handleChange}
                            placeholder="Name" name="name" className="form-control" required={true}/>
                        </label><br />

                        <label>
                        Sex:<input type="radio"  name="sex" checked={this.state.sex==="Male"}
                          value="Male" name="sex" onChange={this.handleChange} required={true}/>Male
                       
                   </label>

                   <label>
                        <input type="radio"  name="sex" checked={this.state.sex==="Female"}
                          value="Female" name="sex" onChange={this.handleChange} required={true}/>Female
                       
                   </label><br />

                   <label>
                        <input type="date" className="form-control datepicker" 
                        //pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                        placeholder="Selected date" value={this.state.dob} id="dateTime1" 
                        //title="Enter a date in this format YYYY-MM-DD"
                        name="dob" onChange={this.handleChange}  required={true} />
                    </label><br/>
                    
                    <label>
                            <textarea 
                             value={this.state.bio} onChange={this.handleChange}
                             placeholder="Bio" name="bio" className="form-control"  required={true}
                             ></textarea>
                    </label><br />


                    <label>
                        <select  className="form-control" value={this.state.movies}  onChange={this.handleChange} name="movies">
                            <option value={''}>Select Movie</option>
                            {
                                this.state.movieList.map((movie,index)=>{
                                    return(
                                    <option key={index}  value={movie._id}>{movie.name}</option>
                                    )
                                })
                            }
                        </select>
                    </label>


                    <label>
                        <input type="hidden" className="form-control" defaultValue={this.state.user_id} 
                        name="user_id" onChange={this.handleChange} required={true} placeholder="User Id"/>
                    </label><br/>
                        <button type="submit" className="btn btn-primary mb-2">Submit</button>
                   </form>
                </div>
            </React.Fragment>
        )
    }
}
export default ActorForm