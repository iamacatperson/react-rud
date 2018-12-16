import React, { Component } from "react";
import { Link } from "react-router-dom";
import app from "../../base";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';

import Button from "@material-ui/core/Button";

import "../../styles.scss";
import "./Register.scss";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.checkAuthentication();
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

	/**
	 * check whether there's an authenticated user
	 */
	checkAuthentication() {
		app.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.history.push("/users");
			}
		});
	}

	render() {
		const { email, password } = this.state;

		return (
			<div className="register">
				<div>
					
					<h1 className="text-center"><FontAwesomeIcon icon={faReact} /><br />React RUD</h1>
					<h3 className="text-center">Register an account</h3>

					<div className="panel">
						<form onSubmit={this.onSubmit}>
							<label>
								Email
								<input
									name="email"
									type="email"
									onChange={this.handleInputChange}
									value={email}
									placeholder="e.g. john@domain.com"
									required
								/>
							</label>
							<label>
								Password
								<input
									name="password"
									type="password"
									onChange={this.handleInputChange}
									value={password}
									required
								/>
							</label>
							<Button variant="contained" color="primary" type="submit">Sign me up</Button>
						</form>
					</div>

					<p className="text-center">Already have an account? <Link to="/login">Log in</Link>.</p>
				</div>
			</div>
		);
	}
}