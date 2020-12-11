import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Calendar extends Component {
  state = {
    gapi: window.gapi,
    DDocs: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    Scopes: 'https://www.googleapis.com/auth/calendar.readonly',
    start: {
      dateTime: '',
      timeZone: 'America/Chicago',
    },
    end: {
      dateTime: '',
      timeZone: 'America/Chicago',
    },
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
    event: {
      summary: '',
      location: '',
      description: '',
      recurrence: [],
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
            summary: this.state.event.summary,
            location: this.state.event.location,
            description: this.state.event.description,
            start: {
              dateTime: this.state.start.dateTime,
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
      event: {
        ...this.state.event,
        [propertyName]: event.target.value,
      },
    });
  };

  handleInputChangeForDate = (key, propertyName) => (event) => {
    //pulling value from date picker
    this.setState({
      [key]: {
        ...this.state.start,
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
            value={this.state.event.summary}
            onChange={this.handleInputChangeFor('summary')}
            placeholder="Summary"
          />
          <input
            type="text"
            value={this.state.event.location}
            onChange={this.handleInputChangeFor('location')}
            placeholder="Location"
          />
          <input
            type="text"
            value={this.state.event.description}
            onChange={this.handleInputChangeFor('description')}
            placeholder="Description"
          />
          <TextField
            id="datetime-local"
            label="Next Event"
            type="datetime-local"
            Value={this.state.start.dateTime}
            defaultValue="2020-01-01T10:30"
            onChange={this.handleInputChangeForDate('start', 'dateTime')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <p>Click Here to join the biweekly meeting</p>
        <button onClick={this.handleClick}>Try this one jackass</button>
      </div>
    );
  }
}

export default Calendar;
