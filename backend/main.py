from flask import request, jsonify
from config import app, db
from models import Event

# CRUD app
# works using endpoints (localhost:XXXXX/create_event)
# create event (title, date, link, image?)
# send request: POST == create, DELETE, PATCH == update, GET
# send data: json
# returns a Response, with status (200 == success) and json 

@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.all()
    json_events = list(map(lambda x: x.to_json(), events))
    return jsonify({"events" : json_events})

@app.route("/add_event", methods=["POST"])
def add_event(): 
    requestTitle = request.json.get("title")
    requestDate = request.json.get("date")
    requestLink = request.json.get("link")

    if (not requestTitle or not requestDate or not requestLink):
        return (jsonify({"message":"You must include a title, date, and link."}), 400)
    
    new_event = Event(title=requestTitle, date=requestDate, link=requestLink)
    try:
        db.session.add(new_event) # create db obj
        db.session.commit() # push obj to db
    except Exception as e:
        return (jsonify({"message" : str(e)}), 400) #throw any errors

    return (jsonify({"message" : "Event Created"}), 201) #return success

@app.route("/update_event/<int:event_id>", methods=["PATCH"])
def update_event(event_id): 
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"message":"Event not found"})
    
    data = request.json
    event.title = data.get("title", event.title)
    event.date = data.get("date", event.date)
    event.link = data.get("link", event.link)

    db.session.commit()
    return (jsonify({"message" : "Event Updated"}), 201) #return success

@app.route("/delete_event/<int:event_id>", methods=["DELETE"])
def delete_event(event_id): 
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"message":"Event not found"}) 

    db.session.delete(event)
    db.session.commit()
    return (jsonify({"message" : "Event Updated"}), 201) #return success

if (__name__ == "__main__"):
    with app.app_context():
        db.create_all()
    app.run(debug=True)