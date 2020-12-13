import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MyCalendar from './MyCalendar';
import { Button } from '@material-ui/core';

//TO DO
//New Users need to be able to add themselves to established events.
//They'll receive notifications from google. This solves the original issue.

//Need a way to share event with others.

//Need to display current events assigned to Techie Calendar.

class AddButton extends Component {
  state = {
    gapi: window.gapi,
    DDocs: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    Scopes: 'https://www.googleapis.com/auth/calendar.events',
    location:
      'https://zoom.us/j/93996303457?pwd=MVgreG4rRFVydlVKU3F5SGRvdGRhUT09',
  };

  handleClick = () => {
    //function that signs user in and creates google calendar event.
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
            summary: 'Wayward Techie Meetup',
            location: this.state.location,
            description: 'Bi-Weekly Zoom Meeting',
            start: {
              dateTime: new Date('2020-12-17T19:00'), //new Date allows google to register dateTime picker
              timeZone: 'America/Chicago',
            },
            end: {
              dateTime: new Date('2020-12-17T20:00'),
              timeZone: 'America/Chicago',
            },
            recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TH;INTERVAL=2'],
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
            console.log('just before html link', event);
            window.open(event.htmlLink);
          });
        });
    });
  };
  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Testing original ask</Button>
      </div>
    );
  }
}

export default AddButton;
