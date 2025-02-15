/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"

const EventList = ({events, updateEvent, updateCallback}) => {
    const onDelete = async (id) => {
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_event/${id}`, options)
            if (response.status === 200 || response.status === 201) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Events</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Link</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.link}</td> 
                        <td>
                            <button onClick={() => {updateEvent(event)}}>Update</button>
                            <button onClick={() => {onDelete(event.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default EventList