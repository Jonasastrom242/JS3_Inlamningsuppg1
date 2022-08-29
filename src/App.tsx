import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {IEvent} from './models/IEvent'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddEventModal from './components/AddEventModal/AddEventModal';
import Navbar from './components/Navbar/Navbar';
import EventDetails from './Pages/EventDetails';
import EventsView from './Pages/EventsView';



const App:React.FC = () => {

  const [showModal, setShowModal] = React.useState(false)
  
  const [url] = useState<string>('http://localhost:8080/events');


  const [events, setEvents] = useState<IEvent[]>([])


  const closeModal = () => {
    setShowModal(false)
  }

  const addEvent = async (event:IEvent) => {
    const { data, status } = await axios.post<IEvent>('http://localhost:8080/events', event)
    if(status === 201) {
      setEvents(state => [...state, data])
      closeModal()
    }
  }


  const getEvents = useCallback(
    async () => {
      const { data, status } = await axios.get<IEvent[]>(url)

      if(status === 200) {
        setEvents(data)
      }
    }, [url])


  useEffect(() => {
    getEvents()
  }, [getEvents])


  return (
    
    <div className="App">
      <Navbar setShowModal={setShowModal} />
      
      <div className="container">
        
        <Routes>
          
          <Route path='/' element={ <EventsView events={events} /> } />
          <Route path='/event/:id' element={ <EventDetails />} />
                    
        </Routes>
      </div>
      { showModal && <AddEventModal addEvent={addEvent} closeModal={closeModal} />}
    </div>
    
  );
}

export default App;
