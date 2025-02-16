from flask import Flask, jsonify, request
import mysql.connector
from testingSQL import startup, get_map, get_filtered_data, get_search_data
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    #return jsonify(datetime.date(1,1,1))
    startup()
    return jsonify(get_map())

@app.route("/filter", methods=['GET'])
def filter():
    if request.method == 'GET':
        location = request.args["loc"]
        start_date = request.args["startDate"]
        end_date = request.args["endDate"]
        start_time = request.args["startTime"] + ":00"
        end_time = request.args["endTime"] + ":00"
    
    events = get_filtered_data(location, start_date, end_date, start_time, end_time)
    print('events filtered:' + str(events))
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