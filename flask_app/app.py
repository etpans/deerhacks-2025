from flask import Flask
import mysql.connector
from testingSQL import startup, get_map

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello World!"

@app.route("/map")
def map():
    startup()
    number = get_map()
    return number

if __name__ == "__main__":
    app.run()
