import React from 'react'
import axios from 'axios'
//import {Form,Button} from 'bootstrap'

class UserRegister extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            username:''
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        
        axios.post('http://localhost:3025/users/register',formData)
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                alert('error')
            }
            else{
                alert('Registered in')
                const token=response.data.token
                localStorage.setItem('authToken',token)
                this.props.history.push('/users/login')
                //window.location.reload()
            }
        })

    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        return(
            <div className="container" >
                <h3>Register</h3><br />
                <form className="form-group" onSubmit={this.handleSubmit}>
                <label>
                        <input type="text" placeholder="UserName" className="form-control" value={this.state.username}
                        onChange={this.handleChange} name="username" required={true}/>
                    </label><br /><br />
                    <label>
                        <input type="email" placeholder="Email" className="form-control" value={this.state.email}
                        onChange={this.handleChange} name="email" required={true}/>
                    </label><br /><br />
                    <label>
                        <input type="password" placeholder="Password" className="form-control" value={this.state.password}
                        onChange={this.handleChange} name="password" required={true}/>
                    </label><br /><br />
                    <button type="submit" className="btn btn-primary mb-2">Register</button>
                </form>
            </div>
        )
    }
}
export default UserRegister