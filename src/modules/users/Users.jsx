import React, { Component } from "react";

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.getUsers();
	}

	/* fetch users list from API */
	getUsers() {}

	render() {
		return (
			<div className="users">
				<h1>Users List</h1>

				<div className="users__table">
					<div>
						<div>[Photo]</div>
						<div>First Name</div>
						<div>Last Name</div>
						<div>Email</div>
						<div>Phone</div>
						<div>Actions</div>
					</div>
					<div>
						<div>()</div>
						<div>Ava</div>
						<div>Guerrero</div>
						<div>ava.guerrero15@gmail.com</div>
						<div>8888 8888</div>
						<div>Edit | Delete</div>
					</div>
				</div>
			</div>
		);
	}
}