import React from 'react'
import axios from 'axios'
import api from '../common/url'
import ModalActor from './modalActor'
import swal from 'sweetalert'
class MovieForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
            year_of_release:props.year_of_release?props.year_of_release:'',
            plot:props.plot?props.plot:'',
            poster:props.poster?props.poster.path:'',
            actorList:[],
            actors:props.actors?props.actors._id:'',
            producerList:[],
            producer:props.producer?props.producer._id:'',
            user_id:this.props.user_id?this.props.user_id:''
            
        }
    }
    componentDidMount(){
        axios.get(`${api}/actors`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            
            const actorList=response.data
           // console.log(actorList)
            this.setState({actorList})
        })
        .catch((error)=>{
            console.log(error)
        })

        axios.get(`${api}/producers`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            
            const producerList=response.data
           // console.log(producerList)
            this.setState({producerList})
        })
        .catch((error)=>{
            console.log(error)
        })


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
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        //console.log(e.target.value)
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        // const formData={
        //     name:this.state.name,
        //     year_of_release:this.state.year_of_release,
        //     plot:this.state.plot,
        //     poster:this.state.poster,
            
        // }
        const formData=new FormData()
        formData.append('poster',this.state.poster)
        formData.append('name',this.state.name)
        formData.append('year_of_release',this.state.year_of_release)
        formData.append('plot',this.state.plot)
        formData.append('actors',this.state.actors)
        formData.append('producer',this.state.producer)
        formData.append('user_id',this.state.user_id)
        this.props.handleSubmit(formData)
        console.log(formData)

    }

    
    

    handleChangeImage=(e)=>{
        let poster=e.target.files[0]
        console.log(poster)
        this.setState({poster})
    }

    handelActor=()=>{
       window.open('/actors/new','popUpWindow',
       'height=500,width=400,left=500,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
        this.props.handleSubmit()
    }

    render(){
        //console.log(this.state.poster)
        return(
            <React.Fragment>

                <div className="container" >
                <form className="form-group" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" className="form-control" value={this.state.name} 
                        name="name" onChange={this.handleChange} required={true} placeholder="Name"/>
                    </label><br/>

                    <label>
                        <input type="text" className="form-control" value={this.state.year_of_release} 
                        name="year_of_release" onChange={this.handleChange} required={true} placeholder="Year of Release"/>
                    </label>
                   
                   <br />



                    <label>
                        <input type="text" className="form-control" 
                        placeholder="plot" value={this.state.plot} id="dateTime1" 
                        name="plot" onChange={this.handleChange}  required={true} />
                    </label><br/>


                    <label>
                        <select  className="form-control" value={this.state.actors}  onChange={this.handleChange} name="actors">
                            <option value=" ">Select Actor</option>
                            {
                                this.state.actorList.map((actor,index)=>{
                                    return(
                                    <option key={index}  value={actor._id}>{actor.name}</option>
                                    )
                                })
                            }
                        </select> 
                    </label> &nbsp;
                    <label><ModalActor handleFormSubmit={this.props.handleFormSubmit}/></label> <br />
                   

                    <label>
                        <select  className="form-control" value={this.state.producer}  onChange={this.handleChange} name="producer">
                            <option value=" ">Select Producer</option>
                            {
                                this.state.producerList.map((producer,index)=>{
                                    return(
                                    <option key={index}  value={producer._id}>{producer.name}</option>
                                    )
                                })
                            }
                        </select>
                    </label><br />
            
                    <label>
                        <input type="file" className="form control-file"
                        name="poster"  onChange={this.handleChangeImage} required={true} placeholder="poster"/>
                    </label><br/>

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
export default MovieForm