import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '@material-ui/core/button';
import Paper from '@material-ui/core/paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/grid';
import { useAuth } from './context/auth';
import getFromToken from '../utils';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 275
		}
	},
	button: {
		margin: theme.spacing(1),
		borderRadius: '5em',
		color: 'darkgreen',
		backgroundColor: 'white'
	},
	paper: {
		padding: theme.spacing(2)
	},
	center: {
		textAlign: 'center'
	},
	warning: {
		textAlign: 'center',
		color: 'red'
	}
}));

export default function LoginForm() {
	const classes = useStyles();
	const navigate = useNavigate();
	const { authToken, setAuthToken } = useAuth();
	const [ formData, setFormData ] = useState({ username: '', password: '' });
	const [ error, setError ] = useState(false);

	const user = getFromToken(authToken, 'username');

	if (user) return <Navigate to="/" />;

	const handleChange = (e) => {
		let { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError(false);
			const res = await axios.post(`${API_URL}/login`, formData);
			setAuthToken(res.data.token);
			navigate.push('/picks');
		} catch (err) {
			console.log('error', err);
			if (err.response.data.message) {
				setError(err.response.data.message)
			} else {
				setError('Something went wrong :(')
			}
			
		}
	};

	return (
		<Grid container spacing={0} direction="row" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
			<Paper className={classes.paper}>
				<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
					<Grid item xs={12}>
						<TextField
							required
							id="outlined"
							label="Username"
							variant="outlined"
							name="username"
							value={formData['username']}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="outlined-password-input"
							label="Password"
							type="password"
							autoComplete="current-password"
							variant="outlined"
							name="password"
							value={formData['password']}
							onChange={handleChange}
						/>
					</Grid>
					<Grid className={classes.warning} color="secondary" item xd={12}>
						<span>{error}</span>
					</Grid>
					<Grid item xs={12}>
						<Button color="secondary" href="/">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Login
						</Button>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
}
