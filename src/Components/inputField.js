import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MyCalendar from './MyCalendar';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import Year from './year';

class Calendar extends Component {
  state = {
    event: {
      title: '',
      start: '',
      end: '',
      desc: '',
      allDay: null,
    },
    date: new Date().toISOString(),
  };

  componentDidMount() {
    console.log(this.state.date);
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleInputChangeForDate = (propertyName) => (event) => {
    //pulling value from date picker
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  postDate = (event) => {
    axios.post('/date', this.state.event);
    Swal.fire(
      `${this.state.event.title} added!`,
      'Your Event was added to the Calendar',
      'success'
    );
  };

  render() {
    return (
      <div>
        <div className="formPanel">
          <TextField
            type="text"
            value={this.state.title}
            onChange={this.handleInputChangeFor('title')}
            label="Title"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="text"
            value={this.state.desc}
            onChange={this.handleInputChangeFor('desc')}
            label="Description"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            defaultValue={this.state.date}
            onChange={this.handleInputChangeForDate('start')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local"
            label="End Date"
            type="datetime-local"
            defaultValue={this.state.date}
            onChange={this.handleInputChangeForDate('end')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={this.postDate}>Save</Button>
        </div>

        <MyCalendar />
      </div>
    );
  }
}

export default Calendar;
