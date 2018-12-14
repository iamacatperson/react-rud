import React, { Component } from "react";
import axios from "axios";

import "./Users.scss";

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			totalUsers: null,
			userId: null,

			firstName: "",
			lastName: "",
			email: "",
			phone: ""
		};

		this.deleteUser = this.deleteUser.bind(this);
		this.editUser = this.editUser.bind(this);
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

	/**
	 * edits the user and sends back data to server
	 * @param {object} e		event object
	 * @param {string} userId 	userId of item to be deleted
	 */
	editUser(e, user) {
		e.preventDefault();

		this.setState({
			userId: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone
		});
	}

	render() {
		const { users, userId, firstName, lastName, email, phone } = this.state;

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
								<div>
									{user.avatar}
								</div>
								<div>
									{userId !== user.id ? (
										user.firstName
									) : (
										<input
											name="firstName"
											placeholder="First Name"
											type="text"
											value={firstName}
											onChange={this.handleInputChange}
										/>
									)}
								</div>
								<div>
									{userId !== user.id ? (
										user.lastName
									) : (
										<input
											name="lastName"
											placeholder="Last Name"
											type="text"
											value={lastName}
											onChange={this.handleInputChange}
										/>
									)}
								</div>
								<div>
									{userId !== user.id ? (
										user.email
									) : (
										<input
											name="email"
											placeholder="Email"
											type="text"
											value={email}
											onChange={this.handleInputChange}
										/>
									)}
								</div>
								<div>
									{userId !== user.id ? (
										user.phone
									) : (
										<input
											name="phone"
											placeholder="Phone No."
											type="text"
											value={phone}
											onChange={this.handleInputChange}
										/>
									)}
								</div>
								<div>
									{userId !== user.id ? (
										<button
											onClick={e =>
												this.editUser(e, user)
											}
										>
											Edit
										</button>
									) : (
										<button>Save</button>
									)}
									|
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