import React from 'react'


class ProducerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
            sex:props.sex?props.sex:'',
            dob:props.dob?props.dob:'',
            bio:props.bio?props.bio:'',
            
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        //console.log(e.target.value)
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            sex:this.state.sex,
            dob:this.state.dob,
            bio:this.state.bio,
            
        }
        this.props.handleSubmit(formData)
        console.log(formData)

    }

    render(){
        return(
            <React.Fragment>

                <div className="container" >
                <form className="form-group"  onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" className="form-control" value={this.state.name} 
                        name="name" onChange={this.handleChange} required={true} placeholder="Name"/>
                    </label><br/>

                   <label>
                        Sex:<input type="radio"  name="sex" checked={this.state.sex==="Male"}
                          value="Male" onChange={this.handleChange} required={true}/>Male
                       
                   </label>

                   <label>
                        <input type="radio"  name="sex" checked={this.state.sex==="Female"}
                          value="Female" onChange={this.handleChange} required={true}/>Female
                       
                   </label><br />



                    <label>
                        <input type="date" className="form-control datepicker" 
                        placeholder="Selected date" value={this.state.dob} id="dateTime1" 
                        name="dob" onChange={this.handleChange}  required={true} />
                    </label><br/>
            
                    <label>
                        <input type="text" className="form-control"  value={this.state.bio}
                        name="bio"  onChange={this.handleChange} required={true} placeholder="BIO"/>
                    </label><br/>

                   
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                </form>
                </div>
                
            </React.Fragment>
        )
    }
}
export default ProducerForm