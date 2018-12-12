import React, { Component } from 'react';

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		this.getUsers();
	}

	/* fetch users list from API */
	getUsers() {
		console.log("GET USERS");
	}

	render() {
		return (
			<div className="users">

				<h1>Users List</h1>

				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Avatar</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>[Avatar]</td>
							<td>Ava</td>
							<td>Guerrero</td>
							<td>Edit Delete</td>
						</tr>
						<tr>
							<td>2</td>
							<td>[Avatar]</td>
							<td>Eugene</td>
							<td>Guerrero</td>
							<td>Edit Delete</td>
						</tr>
						<tr>
							<td>3</td>
							<td>[Avatar]</td>
							<td>Joseph</td>
							<td>Guerrero</td>
							<td>Edit Delete</td>
						</tr>
					</tbody>
				</table>

			</div>
		);
	}
}