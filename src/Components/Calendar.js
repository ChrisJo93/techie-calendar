import React, { Component } from 'react';
import Axios from 'axios';

class Calendar extends Component {
  state = {
    gapi: window.gapi,
    DDocs: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    Scopes: 'https://www.googleapis.com/auth/calendar.readonly',
    Event: {
      summary: '',
      location: '',
      description: '',
      start: {
        dateTime: '',
        timeZone: 'America/Chicago',
      },
      end: {
        dateTime: '',
        timeZone: 'America/Chicago',
      },
      recurrence: [],
      attendees: [
        {
          Email: '',
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    },
  };

  handleClick = () => {
    this.state.gapi.load('client:auth2', () => {
      this.state.gapi.client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: this.state.DDocs,
        scope: this.state.Scopes,
      });

      this.state.gapi.client.load('calendar', 'v3', () =>
        console.log('Client Loaded')
      );

      this.state.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const event = {
            summary: 'Thursday Meeting',
            location: 'Some Zoom Channel',
            description: 'Bi-weekly event',
            start: {
              dateTime: '2021-01-5T09:00:00-07:00',
              timeZone: 'America/Chicago',
            },
            end: {
              dateTime: '2021-01-5T17:00:00-07:00',
              timeZone: 'America/Chicago',
            },
            recurrence: ['RRULE:FREQ=WEEKLY;COUNT=2'],
            attendees: [{ email: 'Johnny.C.Alexander@gmail.com' }],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          const request = this.state.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });
          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });
          // get events
          this.state.gapi.client.calendar.events
            .list({
              calendarId: 'primary',
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: 'startTime',
            })
            .then((response) => {
              const events = response.result.items;
              console.log('EVENTS: ', events);
            });
          //
        });
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      Event: {
        ...this.state.Event,
        [propertyName]: event.target.value,
      },
    });
  };

  render() {
    return (
      <div>
        <div>
          <input
            type="text"
            value={this.state.Event.summary}
            onChange={this.handleInputChangeFor('summary')}
            placeholder="Summary"
          />
          <input
            type="text"
            value={this.state.Event.location}
            onChange={this.handleInputChangeFor('location')}
            placeholder="Location"
          />
          <input
            type="text"
            value={this.state.Event.description}
            onChange={this.handleInputChangeFor('description')}
            placeholder="Description"
          />
        </div>
        <p>Click Here to join the biweekly meeting</p>
        <button onClick={this.handleClick}>Try this one jackass</button>
      </div>
    );
  }
}

export default Calendar;
