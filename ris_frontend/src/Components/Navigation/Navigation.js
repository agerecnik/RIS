import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, name, role}) => {
	if (isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'space-between'}}>
				<p  className='white f5 pa2'> {`Currently logged in as ${name}, ${role}`}</p>
				<p onClick={() => onRouteChange('patientfind')} className='f3 link dim black underline pa2 pointer'>Find Patient</p>
				<p onClick={() => onRouteChange('sendradiologyorder')} className='f3 link dim black underline pa2 pointer'>Radiology Order</p>
				<p onClick={() => onRouteChange('patientregistration')} className='f3 link dim black underline pa2 pointer'>Registration</p>
				<p onClick={() => onRouteChange('settings')} className='f3 link dim black underline pa2 pointer'>Settings</p>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa2 pointer'>Sign Out</p>
			</nav>
		)
	}
	else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer'>Not logged in!</p>
			</nav>
		);
	}
}

export default Navigation;