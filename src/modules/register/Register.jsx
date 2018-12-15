import React, { Component } from "react";
import app from "../../base";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	/**
	 * handles submission of registration credentials to firebase
	 * @param {object} e		event object
	 */
	onSubmit(e) {
		e.preventDefault();
		const { email, password } = this.state;

		try {
			const user = app
				.auth()
				.createUserWithEmailAndPassword(email, password);
			this.props.history.push("/login");
		} catch (error) {
			alert(error);
		}
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

	render() {
		const { email, password } = this.state;

		return (
			<div className="users">
				<h1>Register</h1>

				<form onSubmit={this.onSubmit}>
					<label>
						Email
						<input
							name="email"
							type="email"
							onChange={this.handleInputChange}
							value={email}
							placeholder="Email"
						/>
					</label>
					<label>
						Password
						<input
							name="password"
							type="password"
							onChange={this.handleInputChange}
							value={password}
							placeholder="Password"
						/>
					</label>
					<button type="submit">Sign Up</button>
				</form>
			</div>
		);
	}
}