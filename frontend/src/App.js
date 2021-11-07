import React from 'react';
import Paths from './components/Routes';
import Image from './static/bg1.jpg';
import { withStyles } from '@material-ui/core/styles';
import './App.css';

const styles = (theme) => ({
	'@global': {
		body: {
			backgroundImage: `url(${Image})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			backgroundSize: 'cover',
			backgroundAttachment: 'fixed',
			height: '100%'
		},
		html: {
			height: '100%'
		},
		'#componentWithId': {
			height: '100%'
		}
	}
});

function App() {
	
	return <Paths />;
}

export default withStyles(styles)(App);
