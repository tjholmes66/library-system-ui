import React, { Component } from 'react'
import RoleService from '../services/RoleService';

class CreateRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            roleCode: '',
            roleName: ''
        }
        this.changeRoleCodeHandler = this.changeRoleCodeHandler.bind(this);
        this.changeRoleNameHandler = this.changeRoleNameHandler.bind(this);
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
                this.setState({roleCode: role.roleCode,
                    roleName: role.roleName
                });
            });
        }        
    }
    saveOrUpdateRole = (e) => {
        e.preventDefault();
        let role = {roleCode: this.state.roleCode, roleName: this.state.roleName};
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
    
    changeRoleCodeHandler= (event) => {
        this.setState({roleCode: event.target.value});
    }

    changeRoleNameHandler= (event) => {
        this.setState({roleName: event.target.value});
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
                                            <label> Role Code: </label>
                                            <input placeholder="Role Code" name="roleCode" className="form-control" 
                                                value={this.state.roleCode} onChange={this.changeRoleCodeHandler}/>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Role Name: </label>
                                            <input placeholder="Last Name" name="roleName" className="form-control" 
                                                value={this.state.roleName} onChange={this.changeRoleNameHandler}/>
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
