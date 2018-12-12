import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Avatar</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>1</TableCell>
							<TableCell>[Placeholder]</TableCell>
							<TableCell>Ava</TableCell>
							<TableCell>Guerrero</TableCell>
						</TableRow>
					</TableBody>
				</Table>

			</div>
		);
	}
}