import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	text: {
		...theme.typography.button,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(1)
	},
	green: {
		backgroundColor: green[100]
	},
	red: {
		backgroundColor: red[100]
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: green[500]
	},
	card: {
		margin: theme.spacing(1)
	}
}));

export default function ScoreCard({ username, roster = [], score }) {
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={
					<Avatar aria-label="username" className={classes.avatar}>
						{username[0].toUpperCase()}
					</Avatar>
				}
				action={
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				}
				title={score}
				subheader={username}
			/>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableBody>
								{Object.keys(roster).map((r, idx) => (
									<React.Fragment key={idx}>
										<TableRow className={roster[r].points > 0 ? classes.green : classes.red}>
											<TableCell align="right">
												{r[0].toUpperCase() + r.slice(1, r.length).replace('_', ' ')}
											</TableCell>
											<TableCell>{roster[r].name}</TableCell>
											<TableCell>{roster[r].points}</TableCell>
										</TableRow>
									</React.Fragment>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Collapse>
		</Card>
	);
}
