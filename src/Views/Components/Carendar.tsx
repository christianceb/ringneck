import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import BillEventAdapter from 'Adapters/BillEventAdapter';

const Carendar = (props: CarendarProps) => {
  const [events, setEvents] = useState((new BillEventAdapter).get());

    return (
      <FullCalendar
        height={"100vh"}
        weekNumbers={true}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={events}
      />
    )
}

export default Carendar;

interface CarendarProps
{
  events?: EventSource[]
}