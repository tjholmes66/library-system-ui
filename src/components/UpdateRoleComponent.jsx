import React, { Component } from 'react'
import RoleService from '../services/RoleService';

class UpdateRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            roleCode: '',
            roleName: ''
        }
        this.changeRoleCodeHandler = this.changeRoleCodeHandler.bind(this);
        this.changeRoleNameHandler = this.changeRoleNameHandler.bind(this);
        this.updateRole = this.updateRole.bind(this);
    }

    componentDidMount(){
        RoleService.getRoleById(this.state.id).then( (res) =>{
            let role = res.data;
            this.setState({roleCode: role.roleCode,
                roleName: role.roleName
            });
        });
    }

    updateRole = (e) => {
        e.preventDefault();
        let role = {roleCode: this.state.roleCode, roleName: this.state.roleName};
        console.log('role => ' + JSON.stringify(role));
        console.log('id => ' + JSON.stringify(this.state.id));
        RoleService.updateRole(role, this.state.id).then( res => {
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
                                            <label> Role C0de: </label>
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
