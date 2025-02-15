import mysql.connector
import datetime

mydb =  None
mycursor = None
locations = []

def startup():
    global mydb, mycursor, locations
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="BlueLemonadeCats87/",
        database="utm_website"
        )
    mycursor = mydb.cursor()
    mycursor.execute("USE utm_website")

    #get all existing location_ids
    sql = ("SELECT location_id FROM locations")
    mycursor.execute(sql)
    result = mycursor.fetchall()
    for line in result:
        locations.append(line[0])

def get_map():
    #count number of events for each location_id
    location_freq = []
    for location in locations:
        sql = ("SELECT COUNT(*) AS `Number of events` FROM events WHERE event_loc = %s")
        val = [location]
        mycursor.execute(sql, val)
        result = mycursor.fetchall()
        location_freq.append((f"{location} : {result[0][0]}"))
    return location_freq

def get_filters(location: str, date: datetime.date, start_time: datetime.time, end_time: datetime.time, categories: list[str]):
    if location:
        sql = ("SELECT event_name,event_loc,event_desc,event_club,event_start_time,event_end_time FROM events WHERE event_loc = %s")
        val = [location]
        mycursor.execute(sql, val)
    if date:
        sql = ("SELECT event_name,event_loc,event_desc,event_club,event_start_time,event_end_time FROM events WHERE event_date = %s")
        val = [date]
        mycursor.execute(sql, val)
    if start_time:
        sql = ("SELECT event_name,event_loc,event_desc,event_club,event_start_time,event_end_time FROM events WHERE event_start_time >= %s")
        val = [start_time]
        mycursor.execute(sql, val)
    if end_time:
        sql = ("SELECT event_name,event_loc,event_desc,event_club,event_start_time,event_end_time FROM events WHERE event_end_time <= %s")
        val = [start_time]
        mycursor.execute(sql, val)

    if categories:
        for category in categories:
            sql = ("SELECT event_id FROM categories WHERE category = %s")
            val = [category]
            mycursor.execute(sql, val)
    
    result = mycursor.fetchall()

    return result_to_eventlist(result)
    
def result_to_eventlist(result: list[tuple]):
    events = []
    for row in result:
        events["name"] = row[0]
        events["loc"] = row[1]
        events["desc"] = row[2]
        events["club"] = row[3]
        events["start_time"] = row[4]
        events["end_time"] = row[5]
    return events

if __name__ == "__main__":
    startup()
    print(get_map())