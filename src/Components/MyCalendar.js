import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { Component } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';

const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  state = {
    events: events,
    view: 'week',
    date: new Date(2015, 3, 12),
  };

  render() {
    return (
      <div style={{ height: '700pt' }}>
        <Calendar
          events={this.state.events}
          // onClick={console.log(this.state.events[0].title)}
          startAccessor="start"
          endAccessor="end"
          date={this.state.date}
          onNavigate={(date) => this.setState({ date })}
          localizer={localizer}
        />
      </div>
    );
  }
}

export default MyCalendar;
