from flask import Flask, jsonify
import mysql.connector
from testingSQL import startup, get_map

app = Flask(__name__)

@app.route("/")
def home():
    print("Hello World!")
    return jsonify("Hello World!")

@app.route("/map")
def map():
    startup()
    number = get_map()
    return jsonify(number)

if __name__ == "__main__":
    app.run()
