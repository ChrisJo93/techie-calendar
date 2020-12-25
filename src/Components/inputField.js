import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MyCalendar from './MyCalendar';
import { Button } from '@material-ui/core';

//TO DO
//New Users need to be able to add themselves to established events.
//They'll receive notifications from google. This solves the original issue.

//Need a way to share event with others.

//Need to display current events assigned to Techie Calendar.

class Calendar extends Component {
  state = {
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
    events: [],
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
    console.log(this.state.start.dateTime);
  };

  render() {
    return (
      <div>
        <div className="formPanel">
          <TextField
            type="text"
            value={this.state.event.summary}
            onChange={this.handleInputChangeFor('summary')}
            placeholder="Title"
          />
          <TextField
            type="text"
            value={this.state.event.location}
            onChange={this.handleInputChangeFor('location')}
            placeholder="Location"
          />
          <TextField
            type="text"
            value={this.state.event.description}
            onChange={this.handleInputChangeFor('description')}
            placeholder="Description"
          />
          <TextField
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            // value={this.state.start.dateTime}
            defaultValue="2020-01-01T10:30"
            onChange={this.handleInputChangeForDate('start', 'dateTime')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local"
            label="End Date"
            type="datetime-local"
            // value={this.state.end.dateTime}
            defaultValue="2020-01-01T10:30"
            onChange={this.handleInputChangeForDate('end', 'dateTime')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <MyCalendar events={this.state.events} />
      </div>
    );
  }
}

export default Calendar;
