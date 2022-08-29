import { FC } from 'react'

import {IEvent} from '../models/IEvent'
import EventCard from '../components/Events/EventCard'

type props = {
  events: IEvent[]
}

const EventsView:FC<props> = ({events}) => {
  const sortedEvents = events.slice().sort((a, b) => a.timestamp - b.timestamp).filter(events => events.timestamp > Date.now());

  return (
    <div className='events-view'>
      {!sortedEvents.length && <p>No events to show</p>}
      { sortedEvents.map(evt => (
        <EventCard evt={evt} key={evt.id} />
      )) }
    </div>
  )
}

export default EventsView