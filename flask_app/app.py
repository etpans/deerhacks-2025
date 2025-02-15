from flask import Flask
import mysql.connector
from testingSQL import startup, get_map

app = Flask(__name__)
# mydb = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="BlueLemonadeCats87/",
#     database="utm_website"
#     )
# mycursor = mydb.cursor()
# mycursor.execute("USE utm_website")

@app.route("/")
def home():
    return "Hello World!"

@app.route("/map")
def map():
    startup()
    number = get_map()
    # for location in locations:
    #     sql = ("SELECT COUNT(*) AS `Number of events` FROM locations WHERE location_id = %s")
    #     val = location
    #     result = mycursor.execute(sql, val).fetchall()
    #     number.append((location + " : " + result[0][0]))
    return number

# def load_locations():
#     global locations
#     sql = ("SELECT location_id FROM locations")
#     result = mycursor.execute(sql).fetchall()
#     locations = []
#     for line in result:
#         locations.append(line[0])

if __name__ == "__main__":
    # load_locations()
    # print(locations)

    app.run()
    # app.run(debug=True)