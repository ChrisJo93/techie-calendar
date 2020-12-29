import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { Component } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';
import Year from './year';
import axios from 'axios';

const localizer = momentLocalizer(moment);
localizer.formats.yearHeaderFormat = 'YYYY';

class MyCalendar extends Component {
  state = {
    events: events,
    view: 'week',
    date: new Date(2021, 0, 1),
  };

  componentDidMount() {
    axios
      .get('/date')
      .then((response) => {
        this.setState({
          events: response.data,
        });
        console.log('retrieved events', response.data);
      })
      .catch((err) => {
        console.log('problem in client get', err);
      });
  }

  render() {
    return (
      <div style={{ height: '700pt' }}>
        <Calendar
          selectable
          events={this.state.events}
          defaultView="week"
          date={this.state.date}
          onNavigate={(date) => {
            this.setState({ date: date });
          }}
          // onClick={console.log(this.state.date)}
          startAccessor="start"
          endAccessor="end"
          localizer={localizer}
          views={{
            day: true,
            week: true,
            month: true,
            year: Year,
          }}
          messages={{ year: 'Year' }}
          toolbar={true}
        />
      </div>
    );
  }
}

export default MyCalendar;
