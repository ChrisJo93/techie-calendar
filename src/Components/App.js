import React from 'react';
import Calendar from './Calendar';

function App() {
  const gapi = window.gapi;

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/calendar.addons.execute';

  //ssL cert
  //cron job to renew ssL cert.

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('Client Loaded'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          const event = {
            summary: 'Thursday Meeting',
            location: 'Some Zoom Channel',
            description: 'Bi-weekly event',
            start: {
              dateTime: '2021-01-5T09:00:00-07:00',
              timeZone: 'America/Chicago',
            },
            end: {
              dateTime: '2021-01-5T17:00:00-07:00',
              timeZone: 'America/Chicago',
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            attendees: [{ email: 'Johnny.C.Alexander@gmail.com' }],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });
          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });
          // get events
          gapi.client.calendar.events
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

  return (
    <div className="App">
      <p>Click to add event to google calendar</p>
      <Calendar />
      <button onClick={handleClick}>Here goes fucking nothing bruv</button>
    </div>
  );
}

export default App;
