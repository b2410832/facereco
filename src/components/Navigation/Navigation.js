import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p  onClick={() => onRouteChange('signout')} //callback function
				className='f3 link dim underline pa3 pointer' 
				style={{color: 'white'}}>Sign Out</p>
			</nav>
		);	
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p  onClick={() => onRouteChange('signin')} //callback function
				className='f3 link dim underline pa3 pointer' 
				style={{color: 'white'}}>Sign in</p>
			<p  onClick={() => onRouteChange('register')} //callback function
				className='f3 link dim underline pa3 pointer' 
				style={{color: 'white'}}>Register</p>
			</nav>
		);
	}
}

export default Navigation;