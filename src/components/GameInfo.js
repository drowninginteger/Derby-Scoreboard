
import React, { Component } from 'react';

const { secondsToTimeString } = require('../util/helpers.js');

/*
    Default game data values
*/
const period_length = 5; // 30 minutes (in seconds)
const period_length_display = secondsToTimeString(period_length);
const jam_length = 2; // 2 minutes (in seconds)
const jam_length_display = secondsToTimeString(jam_length);

class GameInfo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			period: 1,
			period_timer: null,
			period_timer_int: period_length,
			period_timer_display: period_length_display,
			period_timer_active: false,
			jam: 1,
			jam_timer: null,
			jam_timer_int: jam_length,
			jam_timer_display: jam_length_display,
			jam_timer_active: false,
			lead_team: 0,
		};

		this.bc = this.props.bc;

		// Receive data on BroadcastChannel and update appropriate state data.
		// But only if on the public side of the app. 
		if (this.props.isPublic){
			this.bc.onmessage = (event) => {
				const data = event.data;

				switch (data.function){
					case 'startStopPeriodTimer':
						this.setState({
							period_timer_display: data.period_timer_display
						});
						break;

					case 'startStopJamTimer':
						this.setState({
							jam_timer_display: data.jam_timer_display
						});
						break;

					case 'newPeriod':
						this.setState({
							period: data.period
						});
						break;

					case 'newJam':
						this.setState({
							jam: data.jam
						});
						break;

					default:
				}
			};
		}
	}

	startStopPeriodTimer = (event) => {

		if (this.state.period_timer_active){

			clearInterval(this.state.period_timer);

			this.setState({
				period_timer: null,
				period_timer_active: false
			});

		} else {

			let time = this.state.period_timer_int;
			let time_display = secondsToTimeString(time);

			const period_timer = setInterval(() => {
				time--;
				time_display = secondsToTimeString(time);

				this.setState({
					period_timer: period_timer,
					period_timer_int: time,
					period_timer_display: time_display,
					period_timer_active: true
				});

				this.bc.postMessage({'function': 'startStopPeriodTimer', 'period_timer_int': time, 'period_timer_display': time_display});

				if (time === 0){
					clearInterval(period_timer);
					clearInterval(this.state.period_timer);

					const period = (this.state.period + 1);

					this.bc.postMessage({'function': 'newPeriod', 'period': period});

					this.setState({
						period: period,
						period_timer: null,
						period_timer_int: period_length,
						period_timer_display: period_length_display,
						period_timer_active: false
					});
				}
			}, 1000);

		}

	}

	startStopJamTimer = (event) => {

		if (this.state.jam_timer_active){

			clearInterval(this.state.jam_timer);

			this.setState({
				jam_timer: null,
				jam_timer_active: false
			});

		} else {

			let time = this.state.jam_timer_int;
			let time_display = secondsToTimeString(time);

			const jam_timer = setInterval(() => {
				time--;
				time_display = secondsToTimeString(time);

				this.setState({
					jam_timer: jam_timer,
					jam_timer_int: time,
					jam_timer_display: time_display,
					jam_timer_active: true
				});

				this.bc.postMessage({'function': 'startStopJamTimer', 'jam_timer_int': time, 'jam_timer_display': time_display});

				if (time === 0){
					clearInterval(jam_timer);
					clearInterval(this.state.jam_timer);

					const jam = (this.state.jam + 1);

					this.bc.postMessage({'function': 'newJam', 'jam': jam});

					this.setState({
						jam: jam,
						jam_timer: null,
						jam_timer_int: jam_length,
						jam_timer_display: jam_length_display,
						jam_timer_active: false
					});
				}
			}, 1000);

		}

	}

	render() {
		return (
			<div className="game-info">
				<h3>Period {this.state.period.toString()}</h3>
				<time>{this.state.period_timer_display}</time>

				{
					!this.props.isPublic ? (
						<p><button onClick={this.startStopPeriodTimer}>{this.state.period_timer_active ? 'Stop' : 'Start'} Clock</button></p>
					) : ('')
				}

				<h3>Jam {this.state.jam.toString()}</h3>
				<time>{this.state.jam_timer_display}</time>

				{
					!this.props.isPublic ? (
						<p><button onClick={this.startStopJamTimer}>{this.state.jam_timer_active ? 'Stop' : 'Start'} Jam</button></p>
					) : ('')
				}
			</div>
		);
	}

}

export default GameInfo;
