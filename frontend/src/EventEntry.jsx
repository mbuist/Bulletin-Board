/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import {useState} from "react"

const EventEntry = ({ existingEvent = {}, updateCallback}) => {
    const [title, setTitle] = useState(existingEvent.title || "")
    const [date, setDate] = useState(existingEvent.date || "")
    const [link, setLink] = useState(existingEvent.link || "")


    const updating = Object.entries(existingEvent).length != 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            title,
            date,
            link
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_event/${existingEvent.id}` : "add_event")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status != 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (<form onSubmit={onSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input> 
        </div>
        <div>
            <label htmlFor="date">Date:</label> 
            <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input> 
        </div>
        <div>
            <label htmlFor="link">Link:</label> 
            <input type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)}></input>
        </div>
        <button type="submit">Submit Event</button>
    </form>)
}

export default EventEntry