import React, { Component } from 'react'
import RoleService from '../services/RoleService';

class CreateRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateRole = this.saveOrUpdateRole.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            RoleService.getRoleById(this.state.id).then( (res) =>{
                let role = res.data;
                this.setState({firstName: role.firstName,
                    lastName: role.lastName,
                    emailId : role.emailId
                });
            });
        }        
    }
    saveOrUpdateRole = (e) => {
        e.preventDefault();
        let role = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('role => ' + JSON.stringify(role));

        // step 5
        if(this.state.id === '_add'){
            RoleService.createRole(role).then(res =>{
                this.props.history.push('/roles');
            });
        }else{
            RoleService.updateRole(role, this.state.id).then( res => {
                this.props.history.push('/roles');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/roles');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Role</h3>
        }else{
            return <h3 className="text-center">Update Role</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateRole}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateRoleComponent
