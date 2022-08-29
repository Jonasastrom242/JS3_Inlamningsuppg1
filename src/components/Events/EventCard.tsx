import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import {IEvent} from '../../models/IEvent'
import './EventCard.css'
import moment from 'moment'
import 'moment/locale/en-gb'

interface EvtProps {
  evt: IEvent
}

const EventCard:FC<EvtProps> = ({evt}) => {
  return (
    <Link to={`/event/${evt.id}`} className="card d-flex justify-between">
      <div className='evt-title'>{evt.title}</div>
      <p>{moment(evt.timestamp).fromNow()}</p>
    </Link>
  )
}

export default EventCard