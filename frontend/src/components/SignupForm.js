import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/button';
import Paper from '@material-ui/core/paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/grid';
import { makeStyles } from '@material-ui/core/styles';
import FantasyApi from '../FantasyApi';

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

export default function SignupForm() {
	const classes = useStyles();
	const history = useHistory();

	const [ formData, setFormData ] = useState('');
	const [ error, setError ] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await FantasyApi.createUser(formData);
			history.push('/');
		} catch (err) {
			setError(err);
		}
	};

	return (
		<Grid container spacing={0} direction="row" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
			<Paper className={classes.paper}>
				<form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
					<Grid item xs={12}>
						<TextField
							required
							id="username"
							label="Username"
							variant="outlined"
							name="username"
							onChange={handleChange}
							value={formData['name']}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="password-input"
							label="Password"
							type="password"
							variant="outlined"
							name="password"
							onChange={handleChange}
							value={formData['name']}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id="repeat-password-input"
							label="Repeat Password"
							type="password"
							variant="outlined"
							name="password-repeat"
							onChange={handleChange}
							value={formData['name']}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField required id="email" label="Email" variant="outlined" />
					</Grid>
					<Grid className={classes.warning} color="secondary" item xd={12}>
						<span>{error}</span>
					</Grid>
					<Grid item xs={12}>
						<Button className={classes.button} href="/">
							Cancel
						</Button>
						<Button className={classes.button} type="submit">
							Login
						</Button>
					</Grid>
				</form>
			</Paper>
		</Grid>
	);
}
