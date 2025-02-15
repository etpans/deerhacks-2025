from flask import Flask
import mysql.connector

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
    return "Hello World!"

@app.route("/map")
def map():
    
    for location in locations:
        sql = ("SELECT COUNT(*) AS [Number of events] WHERE event_location = %s")
        val = location
        result = mycursor.execute(sql, val).fetchall()
    return "Hello World!"

if __name__ == "__main__":
    app.run()
    # app.run(debug=True)