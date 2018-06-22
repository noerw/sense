'use strict';
import React from 'react';
import config from '../config';

document.title += ` - ${config.title}`;

var App = React.createClass({
  displayName: 'App',

  propTypes: {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.object
  },

  render: function () {
    return (
      <div>
        <header className='site-header' role='banner'>
          <div className='inner'>
            <div className='site-headline'>
              <h1 className='site-title'>
                <a href={'https://opensensemap.org/explore/' + config.senseBox.id}>{config.title}</a>
              </h1>
            </div>
          </div>
        </header>

        <main className='site-body' role='main'>
          {this.props.children}
        </main>
        <footer className='site-footer' role='footer'>
          <p>by <a href='https://developmentseed.org' title='Visit Development Seed website' target="_blank">Development Seed</a> using <a href={'https://opensensemap.org/explore/' + config.senseBox.id} title='Visit openSenseMap website' target="_blank">openSenseMap</a> data.</p>
        </footer>
      </div>
    );
  }
});

module.exports = App;
