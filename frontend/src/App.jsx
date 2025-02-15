/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import EventList from "./EventList"
import EventEntry from "./EventEntry"
import './App.css'

function App() { 
  const [event, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [currentEvent, setCurrentEvent] = useState({})

  useEffect(() => {
    fetchEvents()
  }, []);

  const fetchEvents = async () => {
    const response = await fetch("http://127.0.0.1:5000/events");
    const data = await response.json();
    setEvents(data.events);
    console.log(data.events);
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentEvent({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (event) => {
    if (isModalOpen) return
    setCurrentEvent(event)
    setIsModalOpen(true)
 }

  const onUpdate = () => {
    closeModal()
    fetchEvents()
  }
 

  return (<> <EventList events={event} updateEvent={openEditModal} updateCallback={onUpdate}/>
              <button onClick={openCreateModal}>Submit Event</button>
            {isModalOpen && <div className="modal"> 
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
              <EventEntry  existingEvent={currentEvent} updateCallback={onUpdate}/> 
              </div>
            </div> 
            } 
          </>)
}

export default App
