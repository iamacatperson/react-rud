import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookDead, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

import "../../styles.scss";

const NotFound = () => {
	return (
		<div className="login">
			<h1 className="text-center"><FontAwesomeIcon icon={faBookDead} /><br />Oops, that page is not available.</h1>
			<p className="text-center">This is just a simple app that has not a lot of pages!</p>

			<p><Link to="/users"><FontAwesomeIcon icon={faHandPointLeft} /> Bring me home</Link></p>

		</div>
	);

}

export default NotFound;