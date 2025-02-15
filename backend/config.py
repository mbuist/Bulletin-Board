from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS #cross origin request. send request to this backend from a different URL

app = Flask(__name__)
CORS(app) # allows front end to talk to backend

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" #local db path
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False #don't track db modifications

db = SQLAlchemy(app)

