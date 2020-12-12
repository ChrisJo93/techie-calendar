import { Calendar, momentLocalizer } from 'react-big-calendar';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const MyCalendar = (props) => {
  useEffect(() => {
    console.log(props);
  });
  return (
    <div className="rbc-calendar">
      <Calendar
        localizer={localizer}
        events={props.events}
        startAccessor="f"
        // {(props) => new Date(props.events.start.dateTime)}
        endAccessor="f"
        // {(props) => new Date(props.events.end.dateTime)}
      />
    </div>
  );
};

export default MyCalendar;
