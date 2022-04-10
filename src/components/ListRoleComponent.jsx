import React, { Component } from 'react'
import RoleService from '../services/RoleService'

class ListRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                roles: []
        }
        this.addRole = this.addRole.bind(this);
        this.editRole = this.editRole.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
    }

    deleteRole(id){
        RoleService.deleteRole(id).then( res => {
            this.setState({roles: this.state.roles.filter(role => role.roleId !== id)});
        });
    }
    viewRole(id){
        this.props.history.push(`/view-role/${id}`);
    }
    editRole(id){
        this.props.history.push(`/update-role/${id}`);
    }

    componentDidMount(){
        RoleService.getRoles().then((res) => {
            this.setState({ roles: res.data});
        });
    }

    addRole(){
        this.props.history.push('/add-role/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Roles List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addRole}> Add Role</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Role Id</th>
                                    <th> Role Code</th>
                                    <th> Role Name</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.roles.map(
                                        role => 
                                        <tr key = {role.roleId}>
                                             <td> {role.roleId} </td>
                                             <td> {role.roleCode} </td>
                                             <td> {role.roleName}</td>
                                             <td>
                                                 <button onClick={ () => this.editRole(role.roleId)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteRole(role.roleId)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewRole(role.roleId)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListRoleComponent
