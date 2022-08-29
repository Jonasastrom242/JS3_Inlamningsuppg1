import React, { FC, useState, useRef } from 'react'
import {IEvent} from '../../models/IEvent'
import './AddEventModal.css'

type props = {
  closeModal: () => void,
  addEvent: (event: IEvent) => Promise<void>
}

const AddEventModal:FC<props> = ({ closeModal, addEvent }) => {

  const [formData, setFormData] = useState<IEvent>({
    title: '',
    description: '',
    timestamp: 0
  })

  const [time, setTime] = useState('')

  
  const bgRef = useRef<HTMLDivElement>(null)
  
  const handleClick:React.MouseEventHandler<HTMLDivElement> = (e) => {
    if(e.target === bgRef.current) {
      closeModal()
    }
  }
  
  const handleChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setFormData(state => {
      return {...state,
        [e.target.name]: e.target.value
      }
    })
  }
  const titleDiv = document.getElementById('titleDiv');
  const timeDiv = document.getElementById('timeDiv');
  const descriptionDiv = document.getElementById('descriptionDiv');

  const titleResponse = document.createElement('p');
  titleResponse.textContent = 'You have to enter a title';

  const timeResponse = document.createElement('p');
  timeResponse.textContent = 'You have to enter date and time';

  const descriptionResponse = document.createElement('p');
  descriptionResponse.textContent = 'You have to enter a description';


  const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {

    e.preventDefault()

    if (!formData.title) {
      titleDiv?.appendChild(titleResponse);
        setTimeout(() => {
          titleResponse.remove();
        }, 4000);
      
    } else if (!time) {

      timeDiv?.appendChild(timeResponse);
      setTimeout(() => {
        timeResponse.remove();
      }, 4000);

    } else if (!formData.description) {

      descriptionDiv?.appendChild(descriptionResponse);
      setTimeout(() => {
        descriptionResponse.remove();
      }, 4000);

    } else if (formData.title && formData.description) {

    const event:IEvent = {...formData, timestamp: Date.parse(time)}
    addEvent(event)

    }
  
  }

  return (
    <div className='modal-bg' onClick={handleClick} ref={bgRef} >
      <div className="modal">
        <button onClick={() => closeModal()} className='btn btn-big r-corner'>X</button>
        <h2 className='modal-title'>Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title" className="inputTitle">Title: </label>
            <input type="text" className='form-control' id='title' name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="response" id="titleDiv"></div>
          <div className="input-group">
            <label htmlFor="timestamp">Date and time:</label>
            <input type="datetime-local" className='form-control' id='timestamp' name="timestamp" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="response" id="timeDiv"></div>
          <div className="input-group">
            <label htmlFor="desc">Description: </label>
            <textarea className='form-control' name="description" id="desc" cols={30} rows={10} value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="response" id="descriptionDiv"></div>
          <div className='d-flex'>
            <button className='btn btn-outline ml-auto'>Add Event</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEventModal