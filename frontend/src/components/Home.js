import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/button';
import Grid from '@material-ui/core/grid';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from './context/auth';
import getFromToken from '../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '40ch'
		},
		[theme.breakpoints.up('md')]: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)'
		}
	},
	button: {
		margin: theme.spacing(2),
		borderRadius: '5em',
		color: 'darkgreen',
		backgroundColor: 'white'
	},
	center: {
		textAlign: 'center'
	}
}));

const Home = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { authToken } = useAuth();

	return <div />;
};

export default Home;
