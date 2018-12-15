import React, { Component } from "react";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {};


	}

	render() {
		return (
			<div className="users">
				<h1>Register</h1>

				<form onSubmit={this.onSubmit}>
					<label>
						Email
						<input name="email" type="email" placeholder="Email" />
					</label>
					<label>
						Password
						<input
							name="password"
							type="password"
							placeholder="Password"
						/>
					</label>
					<button type="submit">Sign Up</button>
				</form>
			</div>
		);
	}
}