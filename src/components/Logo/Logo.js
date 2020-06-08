import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';
 

const Logo = () => {
	return (
		<div className='mw5 mw7-ns center pa3 ph5-ns'>
			<Tilt className="Tilt" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
 				<div className="Tilt-inner"> 
 					<img src={logo} alt='logo' style={{height: '180px'}}/>
 					
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;