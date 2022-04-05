import React, { Component } from 'react'
import RoleService from '../services/RoleService'

class ViewRoleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            role: {}
        }
    }

    componentDidMount(){
        RoleService.getRoleById(this.state.id).then( res => {
            this.setState({role: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Role Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Role First Name: </label>
                            <div> { this.state.role.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Role Last Name: </label>
                            <div> { this.state.role.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Role Email ID: </label>
                            <div> { this.state.role.emailId }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewRoleComponent
