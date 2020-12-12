import { Calendar, momentLocalizer } from 'react-big-calendar';
import React from 'react';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const MyCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={props.events}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
);

export default MyCalendar;
