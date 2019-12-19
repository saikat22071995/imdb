import React from 'react'
import axios from 'axios'
//import {Form,Button} from 'bootstrap'
import swal from 'sweetalert'

class UserLogin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        
        axios.post('http://localhost:3025/users/login',formData)
        .then((response)=>{
            console.log(response)
            if(response.data.error){
                swal('wrong email/password')
            }
            else{
                swal('Logged in')
                const token=response.data
                console.log('token',token)
                localStorage.setItem('authToken',token)
                this.props.history.push('/')
                window.location.reload()
            }
        })

    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        return(
            <div className="container" >
                <h3>Login</h3><br />
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label>
                        <input type="email" placeholder="Email" className="form-control" value={this.state.email}
                        onChange={this.handleChange} name="email" required={true}/>
                    </label><br /><br />
                    <label>
                        <input type="password" placeholder="Password" className="form-control" value={this.state.password}
                        onChange={this.handleChange} name="password" required={true}/>
                    </label><br /><br />
                    <button type="submit" className="btn btn-primary mb-2">Login</button>
                </form>
            </div>
        )
    }
}
export default UserLogin