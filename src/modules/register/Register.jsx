import React, { Component } from "react";
import { Link } from "react-router-dom";
import app from "../../base";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUnlock } from "@fortawesome/free-solid-svg-icons";

import Button from "@material-ui/core/Button";

import "../../styles.scss";
import "./Register.scss";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",

			error: ""
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
			app.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(() => this.props.history.push("/users"))
				.catch(error => {
					this.setState({ error: error.message });
				});
		} catch (err) {
			alert("Error : ", err);
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
		const { email, password, error } = this.state;

		return (
			<div className="register">
				<div>
					
					<h1 className="text-center"><FontAwesomeIcon icon={faReact} /><br />React RUD</h1>
					<h3 className="text-center">Register an account</h3>

					<div className="panel">

						{error && (
							<p className="message-panel message-panel--error text-center">
								{error}
							</p>
						)}

						<form onSubmit={this.onSubmit}>
							<label>
								<FontAwesomeIcon icon={faEnvelope} /> Email
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
								<FontAwesomeIcon icon={faUnlock} /> Password
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

					<p className="text-center">Already have an account? <Link to="/">Log in</Link>.</p>
				</div>
			</div>
		);
	}
}