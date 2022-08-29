import React, { FC, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {IEvent} from '../models/IEvent'
import './EventDetails.css'
import moment from 'moment'
import 'moment/locale/en-gb'

const EventDetails:FC = () => {

  const { id } = useParams()
  const [url] = useState<string>('http://localhost:8080/events/' + id)

  const [event, setEvent] = useState<IEvent | null>(null)

  const getEvent = useCallback(
    async () => {
      const { data, status } = await axios.get<IEvent>(url)
      if(status === 200) {
        setEvent(data)
      }
    }, [url]
  )

  useEffect(() => {
    getEvent()
  }, [getEvent])

 
  return (
    

    <div className="card"><a href="/">
      <h2>{event?.title}</h2>
      <h3>{event?.description}</h3>
      <p><span>At date and time:</span> {(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(event?.timestamp))}</p>
      <p>Starts {moment(event?.timestamp).fromNow()}</p>
      
      </a>
    </div>
  )
}

export default EventDetails