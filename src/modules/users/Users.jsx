import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import app from "../../base";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faExclamationTriangle,
	faSort,
	faUser
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";

import "../../styles.scss";
import "./Users.scss";

const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	}
});

const pageLimit = 4;

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: "",

			users: [],
			totalUsers: null,
			userId: null,

			search: "",

			isLoading: false,

			activePage: 1,
			sortOrder: "asc",
			sortColumn: "firstName",

			avatar: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: ""
		};

		this.searchUsers = this.searchUsers.bind(this);
		this.resetSearch = this.resetSearch.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);

		this.logOut = this.logOut.bind(this);

		this.checkAuthentication();
	}

	componentDidMount() {
		this.getUsers(undefined, undefined, true);
	}

	/**
	 * gets the user list from the API endpoint
	 * @param {string} query		search query string
	 * @param {number} page 		current page
	 * @param {boolean} initLoad 	whether the users are fetched upon mounting of component
	 * @param {string} column 		column / property to be sorted
	 * @param {string} sortOrder 	sort order (asc | desc)
	 */
	getUsers(
		query = "",
		currentPage = 1,
		initLoad,
		column = this.state.sortColumn,
		sortOrder = this.state.sortOrder
	) {
		let delay = null;

		this.setState({ isLoading: true });

		initLoad ? (delay = 5000) : (delay = 0);

		setTimeout(() => {
			axios
				.get(`http://localhost:3001/users?q=${query}`, {
					params: {
						_page: currentPage,
						_limit: pageLimit,
						_sort: column,
						_order: sortOrder
					}
				})
				.then(res => {
					this.setState({
						isLoading: false,
						users: res.data,
						totalUsers: res.headers["x-total-count"]
					});
				});
		}, delay);
	}

	/**
	 * searches the user data using the search query string
	 * @param  {object} e		event object
	 */
	searchUsers(e) {
		const { search } = this.state;
		e.preventDefault();

		this.setState({ activePage: 1 });
		this.getUsers(search);
	}

	/**
	 * resets the search field
	 * @param  {string} query   query string to be used for searching
	 */
	resetSearch(e) {
		e.preventDefault();

		this.setState({
			users: [],
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
		const { activePage, search } = this.state;
		e.preventDefault();

		const result = window.confirm("Are you sure you want to delete?");
		if (result) {
			axios.delete(`http://localhost:3001/users/${userId}`).then(res => {
				this.getUsers(search, activePage);
			});
		}
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
	saveUser(e, userId, userAvatar) {
		const { activePage, search, firstName, lastName, email, phone } = this.state;
		e.preventDefault();

		axios
			.put(`http://localhost:3001/users/${userId}`, {
				avatar: userAvatar,
				firstName:
					firstName.charAt(0).toUpperCase() +
					firstName.slice(1),
				lastName:
					lastName.charAt(0).toUpperCase() +
					lastName.slice(1),
				email: email,
				phone: phone
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
		const { search, sortColumn, sortOrder} = this.state;

		this.getUsers(
			search,
			pageNumber,
			undefined,
			sortColumn,
			sortOrder
		);

		this.setState({ activePage: pageNumber });
	}

	/**
	 * sorts the table in either ascending or descending order
	 * @param {string} column	  column to be sorted
	 */
	sortTable(column) {
		let toggledSort = "";

		this.state.sortOrder === "asc" ? (toggledSort = "desc") : (toggledSort = "asc");

		this.setState({ sortOrder: toggledSort, sortColumn: column }, () => {

			const { search, activePage, sortOrder, sortColumn } = this.state;
			this.getUsers(search, activePage, undefined, sortColumn, sortOrder);

		});

	}

	/**
	 * check whether there's an authenticated user
	 */
	checkAuthentication() {
		app.auth().onAuthStateChanged(user => {
			if (!user) {
				this.props.history.push("/");
			} else {
				this.setState({ currentUser: user.email });
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
					this.props.history.push("/");
				},
				error => {
					console.error("Sign Out Error", error);
				}
			);
	}

	render() {
		const {
			currentUser,
			users,
			isLoading,
			userId,
			search,
			firstName,
			lastName,
			email,
			phone,
			totalUsers,
			activePage
		} = this.state;

		const { classes } = this.props;

		return (
			<div className="users">
				<div className="users__header">
					<h1>
						<FontAwesomeIcon icon={faReact} /> React RUD
					</h1>

					<p>
						{currentUser &&
							`Logged in with ${(
								<strong>currentUser</strong>
							)}!`}{" "}
						(<Button onClick={this.logOut}>Logout</Button>)
					</p>
				</div>

				<p>
					This is a list of dummy users served by json-server with an initial delay of <strong>5 seconds</strong>. Try to{" "}
					<strong>Edit</strong>, <strong>Delete</strong>, and <strong>Search</strong> some
					users!
				</p>

				<form className="search" onSubmit={this.searchUsers}>
					<div className="search__container">
						<input
							type="text"
							placeholder="Search anything! (Can press Enter)"
							name="search"
							value={search}
							onChange={this.handleInputChange}
						/>

						<Button
							variant="contained"
							type="submit"
							className={classes.button}
							color="primary"
						>
							Submit
						</Button>

						<Button
							className={classes.button}
							onClick={this.resetSearch}
						>
							Reset
						</Button>
					</div>
				</form>

				<div className="users__table">
					<div className="users__table-row users__table-row users__table-row--header">
						<div />
						<div onClick={() => this.sortTable("firstName")}>
							<p>
								First Name <FontAwesomeIcon icon={faSort} />
							</p>
						</div>
						<div onClick={() => this.sortTable("lastName")}>
							<p>
								Last Name <FontAwesomeIcon icon={faSort} />
							</p>
						</div>
						<div onClick={() => this.sortTable("email")}>
							<p>
								Email <FontAwesomeIcon icon={faSort} />
							</p>
						</div>
						<div onClick={() => this.sortTable("phone")}>
							<p>
								Phone <FontAwesomeIcon icon={faSort} />
							</p>
						</div>
						<div>
							<p>Actions</p>
						</div>
					</div>

					{isLoading &&
						!users.length &&
						[...Array(pageLimit)].map((row, index) => {
							return (
								<div
									className="users__table-row users__table-row--loading"
									key={index}
								>
									<div className="users__table-row" />
									{[...Array(5)].map((row, index) => {
										return (
											<div
												key={index}
												className="users__table-row"
											>
												<p />
											</div>
										);
									})}
								</div>
							);
						})}

					{!isLoading && !users.length && (
						<p className="users__table-cell--empty">
							<FontAwesomeIcon icon={faExclamationTriangle} />{" "}
							{`Sorry, there are no results for "${search}". :( Try another search!`}
						</p>
					)}

					{!!users.length &&
						users.map(user => {
							return (
								<form
									onSubmit={e =>
										this.saveUser(e, user.id, user.avatar)
									}
									key={user.id}
									className={`users__table-row ${
										userId === user.id
											? "users__table-row--highlighted"
											: null
									}`}
								>
									<div>
										<p>
											<img
												src={user.avatar}
												alt={user.firstName}
											/>
										</p>
									</div>
									<div>
										{userId !== user.id ? (
											<p>{user.firstName}</p>
										) : (
											<input
												name="firstName"
												placeholder="First Name"
												type="text"
												value={firstName}
												pattern="[A-Za-z]{2,50}"
												onChange={
													this.handleInputChange
												}
												title="First Name should not contain any digit, space, or special character"
												required
											/>
										)}
									</div>
									<div>
										{userId !== user.id ? (
											<p>{user.lastName}</p>
										) : (
											<input
												name="lastName"
												placeholder="Last Name"
												type="text"
												value={lastName}
												pattern="[A-Za-z]{2,50}"
												onChange={
													this.handleInputChange
												}
												title="Last Name should not contain any digit, space, or special character"
												required
											/>
										)}
									</div>
									<div>
										{userId !== user.id ? (
											<p>
												<a
													href={`mailto: ${
														user.email
													}`}
												>
													{user.email}
												</a>
											</p>
										) : (
											<input
												name="email"
												placeholder="Email"
												type="email"
												value={email}
												onChange={
													this.handleInputChange
												}
											/>
										)}
									</div>
									<div>
										{userId !== user.id ? (
											<p>{user.phone}</p>
										) : (
											<input
												name="phone"
												placeholder="Phone No."
												type="text"
												value={phone}
												onChange={
													this.handleInputChange
												}
											/>
										)}
									</div>
									<div>
										{userId !== user.id ? (
											<Button
												variant="contained"
												className={classes.button}
												color="primary"
												onClick={e =>
													this.editUser(e, user)
												}
											>
												Edit
											</Button>
										) : (
											<Button
												variant="contained"
												className={classes.button}
												color="primary"
												type="submit"
											>
												{!isLoading
													? "Save"
													: "Saving..."}
											</Button>
										)}

										<Button
											className={classes.button}
											color="secondary"
											onClick={e =>
												this.deleteUser(e, user.id)
											}
										>
											Delete
										</Button>
									</div>
								</form>
							);
						})}
				</div>

				<div className="container--full-width">
					{!!users.length && (
						<ul className="pagination">
							{[...Array(Math.round(totalUsers / pageLimit))].map(
								(_, index) => {
									return (
										<li
											key={index}
											className="pagination__item"
											onClick={() =>
												this.changePage(index + 1)
											}
										>
											<Button
												variant={
													activePage !== index + 1
														? "outlined"
														: "contained"
												}
												color="primary"
											>
												{index + 1}
											</Button>
										</li>
									);
								}
							)}
						</ul>
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(Users));