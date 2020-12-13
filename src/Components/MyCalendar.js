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
      <div style={{ height: 700 }}>
        <button onClick={() => this.setState({ view: 'day' })}>Day</button>
        <button onClick={() => this.setState({ view: 'week' })}>Week</button>
        <button onClick={() => this.setState({ view: 'month' })}>Month</button>
        <Calendar
          style={{ height: 500, width: 800, marginLeft: 315 }}
          toolbar={false}
          events={[
            {
              title: 'My event',
              allDay: false,
              start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
              end: new Date(2018, 0, 1, 14, 0), // 2.00 PM
            },
          ]}
          step={60}
          events={this.state.events}
          onView={() => {}}
          view={this.state.view}
          date={this.state.date}
          onNavigate={(date) => this.setState({ date })}
          localizer={localizer}
        />
      </div>
    );
  }
}

export default MyCalendar;
