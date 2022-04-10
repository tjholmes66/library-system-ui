import React, { Component } from 'react'
import RoleService from '../services/RoleService';

class UpdateRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            roleId: this.props.match.params.id,
            roleCode: '',
            roleName: ''
        }
        this.changeRoleCodeHandler = this.changeRoleCodeHandler.bind(this);
        this.changeRoleNameHandler = this.changeRoleNameHandler.bind(this);
        this.updateRole = this.updateRole.bind(this);
    }

    componentDidMount(){
        RoleService.getRoleById(this.state.roleId).then( (res) =>{
            let role = res.data;
            this.setState({
	            roleId: role.roleId, 
                roleCode: role.roleCode,
                roleName: role.roleName
            });
        });
    }

    updateRole = (e) => {
        e.preventDefault();
        let role = {roleId: this.state.roleId, roleCode: this.state.roleCode, roleName: this.state.roleName};
        console.log('role => ' + JSON.stringify(role));
        console.log('roleId => ' + JSON.stringify(this.state.roleId));
        RoleService.updateRole(role, this.state.roleId).then( res => {
            this.props.history.push('/roles');
        });
    }
    
    changeRoleCodeHandler= (event) => {
        this.setState({roleCode: event.target.value});
    }

    changeRoleNameHandler= (event) => {
        this.setState({roleName: event.target.value});
    }

    cancel(){
        this.props.history.push('/roles');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Role</h3>
                                <div className = "card-body">
                                
                                    <form>
                                    
                                       <div className = "form-group">
                                            <label> Role Id: </label>
                                            <input placeholder="Role Id" name="roleId" className="form-control" 
                                                value={this.state.roleId} readOnly/>
                                        </div>
                                    
                                        <div className = "form-group">
                                            <label> Role Code: </label>
                                            <input placeholder="Role Code" name="roleCode" className="form-control" 
                                                value={this.state.roleCode} onChange={this.changeRoleCodeHandler}/>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Role Name: </label>
                                            <input placeholder="Role Name" name="roleName" className="form-control" 
                                                value={this.state.roleName} onChange={this.changeRoleNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateRole}>Save</button>
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

export default UpdateRoleComponent
