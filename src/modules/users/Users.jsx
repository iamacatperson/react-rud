import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import app from "../../base";

import "./Users.scss";

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			totalUsers: null,
			userId: null,

			search: "",

			activePage: 1,

			firstName: "",
			lastName: "",
			email: "",
			phone: ""
		};

		this.searchUsers = this.searchUsers.bind(this);
		this.resetSearch = this.resetSearch.bind(this);

		this.deleteUser = this.deleteUser.bind(this);
		this.editUser = this.editUser.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);

		this.logOut = this.logOut.bind(this);

		this.checkAuthentication();
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
	 * searches the user data using the search query string
	 * @param  {object} e		event object
	 */
	searchUsers(e) {
		const { search } = this.state;
		e.preventDefault();

		this.getUsers(search);
	}

	/**
	 * resets the search field
	 * @param  {string} query   query string to be used for searching
	 */
	resetSearch(e) {
		e.preventDefault();

		this.setState({
			search: "",
			activePage: 1
		});
		this.getUsers();
	}

	/**
	 * gets the user list from the API endpoint
	 * @param {object} e		event object
	 * @param {string} userId 	userId of item to be deleted
	 */
	deleteUser(e, userId) {
		const { activePage } = this.state;
		e.preventDefault();

		axios.delete(`http://localhost:3001/users/${userId}`).then(res => {
			this.getUsers(undefined, activePage);
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

	/**
	 * saves changes to the user to server
	 * @param {object} e		event object
	 * @param {string} userId 	userId of item to be deleted
	 */
	saveUser(e, userId) {
		const { activePage, search } = this.state;
		e.preventDefault();

		axios
			.put(`http://localhost:3001/users/${userId}`, {
				firstName:
					this.state.firstName.charAt(0).toUpperCase() +
					this.state.firstName.slice(1),
				lastName:
					this.state.lastName.charAt(0).toUpperCase() +
					this.state.lastName.slice(1),
				email: this.state.email,
				phone: this.state.phone
			})
			.then(res => {
				this.getUsers(search, activePage);
				this.setState({ userId: null });
			});
	}

	/**
	 * handles changing of input fields
	 * @param {object} e		event object
	 */
	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	/**
	 * change current page of data
	 * @param {number} pageNumber	 page number to show
	 */
	changePage(pageNumber) {
		this.getUsers(this.state.search, pageNumber);
		this.setState({ activePage: pageNumber });
	}

	/**
	 * check whether there's an authenticated user
	 */
	checkAuthentication() {
		app.auth().onAuthStateChanged(user => {
			if (!user) {
				this.props.history.push("/login");
			}
		});
	}

	/**
	 * logs out the current authenticated user
	 */
	logOut() {
		app.auth()
			.signOut()
			.then(
				() => {
					this.props.history.push("/login");
				},
				error => {
					console.error("Sign Out Error", error);
				}
			);
	}

	render() {
		const {
			users,
			userId,
			search,
			firstName,
			lastName,
			email,
			phone,
			totalUsers,
			activePage
		} = this.state;

		const currentUser = app.auth().currentUser;

		return (
			<div className="users">
				<div className="users__header">
					<h1>React CRUD</h1>

					<p>{currentUser && `Hi, ${currentUser.email}!`}</p>

					<p onClick={this.logOut}>Logout</p>
				</div>

				<h2>Users List</h2>

				<form onSubmit={this.searchUsers}>
					<label>
						Search:
						<input
							type="text"
							name="search"
							value={search}
							onChange={this.handleInputChange}
						/>
					</label>
					<input type="submit" value="Submit" />
					<input
						type="button"
						value="Reset"
						onClick={this.resetSearch}
					/>
				</form>

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
										<button
											onClick={e =>
												this.saveUser(e, user.id)
											}
										>
											Save
										</button>
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

				<ul className="pagination">
					{[...Array(Math.round(totalUsers / 10))].map((_, index) => {
						return (
							<li
								key={index}
								className={
									activePage === index + 1
										? "pagination__item pagination__item--active"
										: null
								}
								onClick={() => this.changePage(index + 1)}
							>
								{index + 1}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default withRouter(Users);