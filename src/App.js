
import React, { Component } from 'react';

// Components
import Team from './components/Team';
import GameInfo from './components/GameInfo';
import BrowserSupport from './components/BrowserSupport';

// Styling
import './App.scss';

// Initialize BroadcastChannel for sending data to a second tab 
// One channel for each team, and one for general game data
const bc1 = new BroadcastChannel('scoreboard_channel_team_one');
const bc2 = new BroadcastChannel('scoreboard_channel_team_two');
const bc_general = new BroadcastChannel('scoreboard_channel_general');

// Get site public status 
const params = new URLSearchParams(window.location.search);
const isPublic = (params.has('public') && params.get('public') === '1');

class App extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        return (
            <div className="App">
                {
                    !isPublic ? (
                        <a href={`${window.location.href}?public=1`} target="_blank" rel="noopener noreferrer">Open Public Side Scoreboard</a>
                    ) : null
                }

                <Team team_name="Team 1" team_number="1" bc={bc1} isPublic={isPublic} />
                <Team team_name="Team 2" team_number="2" bc={bc2} isPublic={isPublic} />

                <GameInfo bc={bc_general} isPublic={isPublic} />

                {
                    !isPublic ? (
                        <BrowserSupport />
                    ) : null
                }
            </div>
        );
    }

}

export default App;
