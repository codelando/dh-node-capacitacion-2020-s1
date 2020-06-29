import React from 'react';

import '../assets/css/Footer.css';

const Footer = ({ children }) => {
	return (
		<React.Fragment>
			<footer className="footer">
				{children[0]}
				<h2>Soy el component Footer</h2>
				{ children[1] }
			</footer>
		</React.Fragment>
	)
}

export default Footer;