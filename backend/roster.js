const { Client } = require('espn-fantasy-football-api/node');
require('dotenv').config();

const dates = {
	8: new Date(1604253600000),
	9: new Date(1604858400000),
	10: new Date(1605463200000),
	11: new Date(2020, 10, 22, 18, 00, 00),
	12: new Date(2020, 10)
};

const getPointsAndLineup = (roster, scores, lineup, teams) => {
	roster.forEach((r) => {
		let pos = r.player.defaultPosition;
		if (r.position !== 'Bench' && r.position !== 'K' && teams.indexOf(r.player.proTeam) !== -1) {
			// Rename keys because ESPNs weird naming conventions.
			if (pos === 'RB/WR') pos = 'WR';
			else if (pos === 'WR') pos = 'TE';
			else if (pos === 'TQB') pos = 'QB';
			else if (pos === 'D/ST') pos = 'DST';

			if (lineup) {
				lineup[pos] ? lineup[pos].push(r.player.fullName) : (lineup[pos] = [ r.player.fullName ]);
			}
			if (scores) {
				scores[r.player.fullName] = Math.round((r.totalPoints + Number.EPSILON) * 100) / 100;
			}
		}
	});
	return { scores, lineup };
};

const fetchRosters = async (week = 12, leagueId = 67154469) => {
	const myClient = new Client({ leagueId: leagueId });
	myClient.setCookies({ espnS2: process.env.ESPNS2, SWID: process.env.SWID });
	try {
		const res = await myClient.getBoxscoreForWeek({
			seasonId: 2020,
			scoringPeriodId: +week,
			matchupPeriodId: +week
		});
		const teams = await myClient.getNFLGamesForPeriod({ startDate: '20201129', endDate: '20201129' });
		const sundayTeams = [];
		teams.map((team) => {
				sundayTeams.push(team.homeTeam.team, team.awayTeam.team);
		});
		res['sundayTeams'] = sundayTeams;
		return res;
	} catch (err) {
		console.error(err);
	}
};

module.exports = { fetchRosters, getPointsAndLineup };
