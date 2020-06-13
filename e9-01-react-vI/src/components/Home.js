import React from 'react';

import '../assets/css/Home.css';

const Home = ({ title }) => {
	return (
		<div className="container">
			<h2>{ title }</h2>
		</div>
	)
}

Home.defaultProps = {
	title: 'Tenés que pasar la prop title'
}

export default Home;