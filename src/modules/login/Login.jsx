import React, { Component } from "react";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}

	render() {
		const { email, password } = this.state;

		return (
			<div className="users">
				<h1>Login</h1>

				<p>Please enter your email and password to login.</p>

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
					<button type="submit">Log In</button>
				</form>
			</div>
		);
	}
}