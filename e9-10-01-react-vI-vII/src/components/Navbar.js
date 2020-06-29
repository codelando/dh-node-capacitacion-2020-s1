import React from 'react';
import PropTypes from 'prop-types';

import '../assets/css/Navbar.css';

const Navbar = ({ links }) => {
	return (
		<nav className="navbar">
			<ul>
				{ links.map((link, i) => <li key={i}><a href={link.url}> {link.text} </a></li>) }
			</ul>
		</nav>
	)
}

Navbar.propTypes = {
	links: PropTypes.array.isRequired,
}

Navbar.defaultProps = {
	links: [],
}

export default Navbar;