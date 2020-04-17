
const bc = new BroadcastChannel('scoreboard_channel');

const app = new Vue({
	el: '#app',
	data: {
		team_1_score: "0",
		team_2_score: "0"
	},
	methods: {
		updateTeamScore: function(event){
			var btn = event.target;
			var btn_data = btn.dataset;
			var team = btn_data.team;
			var key = 'team_' + team + '_score';
			var change = btn_data.change;

			var new_score = parseInt(app[key], 10) + parseInt(change, 10);
			new_score = new_score.toString();
			app[key] = new_score;

			bc.postMessage({'team': team, 'new_score': new_score});
		}
	}
});

bc.onmessage = function (event){
	console.log(event);

	var data = event.data;
	var team = data.team;
	var new_score = data.new_score;
	var key = 'team_' + team + '_score';

	app[key] = new_score;
};