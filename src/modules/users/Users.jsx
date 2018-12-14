import React, { Component } from "react";
import axios from "axios";

import "./Users.scss";

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			totalUsers: null
		};

		this.deleteUser = this.deleteUser.bind(this);
	}

	componentDidMount() {
		this.getUsers();
	}

	/**
	 * gets the user list from the API endpoint
	 * @param {string} query	search query string
	 * @param {number} page 	current page
	 */
	getUsers(query = "", currentPage = 1) {
		axios
			.get(`http://localhost:3001/users?q=${query}`, {
				params: {
					_page: currentPage,
					_limit: 10
				}
			})
			.then(res => {
				this.setState({
					users: res.data,
					totalUsers: res.headers["x-total-count"]
				});
			});
	}

	/**
	 * gets the user list from the API endpoint
	 * @param {object} e		event object
	 * @param {string} userId 	userId of item to be deleted
	 */
	deleteUser(e, userId) {
		e.preventDefault();

		axios.delete(`http://localhost:3001/users/${userId}`).then(res => {
			this.getUsers();
		});
	}

	render() {
		const { users } = this.state;

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
					{users.map(user => {
						return (
							<div key={user.id}>
								<div>{user.avatar}</div>
								<div>{user.firstName}</div>
								<div>{user.lastName}</div>
								<div>{user.email}</div>
								<div>{user.phone}</div>
								<div>
									Edit |{" "}
									<button
										onClick={e =>
											this.deleteUser(e, user.id)
										}
									>
										Delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}