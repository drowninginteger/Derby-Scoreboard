
import React, { Component } from 'react';

class BrowserSupport extends Component {

	render() {
		return (
			<React.Fragment>
			    <h3>Minimum Browser Requirements</h3>
			    <h5>Using an unsupported browser can result in the public side of the scoreboard not updating properly.</h5>
			    
			    <ul>
			        <li>Chrome: 54-current</li>
			        <li>Firefox: 38-current</li>
			        <li>Edge: 79-current</li>
			        <li>IE: Not supported</li>
			        <li>Safari: Not supported</li>
			        <li>Opera: 41-current</li>
			        <li>Mobile browsers: Yeah they work but why would you do that?</li>
			    </ul>
			</React.Fragment>
		);
	}

}

export default BrowserSupport;
