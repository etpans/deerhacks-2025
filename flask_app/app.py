from flask import Flask, jsonify, request
import mysql.connector
from testingSQL import startup, get_map, get_filters

app = Flask(__name__)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="BlueLemonadeCats87/",
    database="utm_website"
)
mycursor = mydb.cursor()
locations = []

@app.route("/")
def home():
    return jsonify(get_map)

@app.route("/filter", methods=['GET'])
def filter():
    if request.method == 'GET':
        location = request.args["loc"]
        date = request.args["date"]
        start_time = request.args["start_time"]
        end_time = request.args["end_time"]
        searches = request.args["search"].split()
    
    events = get_filters(location, date, start_time, end_time, searches)
    return jsonify(events)

if __name__ == "__main__":
    app.run()
