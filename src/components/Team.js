
import React, { Component } from 'react';

/*
	Default team data values
*/
const starting_official_reviews = 3;
const starting_timeouts = 3;

class Team extends Component {

	constructor(props) {
		super(props);

		this.state = {
			score: 0,
			jammer: "",
			official_reviews: starting_official_reviews,
			timeouts: starting_timeouts,
		};

		this.bc = this.props.bc;

		// Receive data on BroadcastChannel and update team score. 
		// But only if on the public side of the app. 
		if (this.props.isPublic){
			this.bc.onmessage = (event) => {
				var data = event.data;

				if (data.function === 'updateScore'){
					this.setState({
						score: data.new_score
					});
				}
			};
		}
	}

	updateScore(delta) {
		let new_score = (this.state.score + delta);
		if (new_score < 0 ? 0 : new_score);

		this.setState({
			score: new_score
		});

		// Post data to BroadcastChannel. All open tabs listen on "bc.onmessage" for incoming data.
		this.bc.postMessage({'function': 'updateScore', 'team_number': this.props.team_number, 'new_score': new_score});
	}

	render() {
		return (
			<div>
				<h2>{this.props.team_name}</h2>
				<h1>{this.state.score}</h1>

				<h3>Official Reviews</h3>
				<p>{this.state.official_reviews}</p>

				<h3>Timeouts</h3>
				<p>{this.state.timeouts}</p>

				{
					!this.props.isPublic ? (
						<React.Fragment>
							<button onClick={() => this.updateScore(-5)}>-5</button>
							<button onClick={() => this.updateScore(-1)}>-1</button>
							<button onClick={() => this.updateScore(1)}>+1</button>
							<button onClick={() => this.updateScore(5)}>+5</button>
						</React.Fragment>
					) : null
				}
			</div>
		);
	}

}

export default Team;
