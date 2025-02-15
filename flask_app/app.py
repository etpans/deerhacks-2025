from flask import Flask, jsonify, request
import mysql.connector
from testingSQL import startup, get_map, get_filtered_data, get_search_data
import datetime

app = Flask(__name__)

@app.route("/")
def home():
    #return jsonify(datetime.date(1,1,1))
    startup()
    return jsonify(get_map())

@app.route("/filter", methods=['GET'])
def filter():
    if request.method == 'GET':
        location = request.args["location"]
        date = request.args["startDate"]
        start_time = request.args["startTime"]
        end_time = request.args["endTime"]
    
    events = get_filtered_data(location, date, start_time, end_time)
    return jsonify(events)

@app.route("/search", methods=['GET'])
def search():
    if request.method == 'GET':
        query = request.args["query"]
    
    events = get_search_data(query)
    return jsonify(events)
    # events = get_search(query)
    # return jsonify(events)

if __name__ == "__main__":
    app.run()
