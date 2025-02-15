from config import db

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True) #id used to index in DB, must be unique
    title = db.Column(db.String(100), unique=False, nullable=False)
    date = db.Column(db.String(100), unique=False, nullable=False)
    link = db.Column(db.String(120), unique=False, nullable=False)

    def to_json(self):
        return {
            "id" : self.id,
            "title" : self.title,
            "date" : self.date,
            "link" : self.link
        }