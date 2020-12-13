import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import eventsList from './events';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [event, setEvent] = useState('Not Found');
  const [view, setView] = useState('Not Found');

  useEffect(() => {});

  return (
    <div style={{ height: 700 }}>
      <button onClick={() => setView({ view: 'day' })}>Day</button>
      <button onClick={() => setView({ view: 'month' })}>Month</button>
      <Calendar
        style={{ height: 500 }}
        toolbar={false}
        events={eventsList}
        step={60}
        onView={() => {}}
        date={new Date()}
        onNavigate={(date) => setEvent({ date })}
        localizer={localizer}
      />
    </div>
  );
};

export default MyCalendar;
