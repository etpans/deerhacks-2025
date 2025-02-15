import mysql.connector
import datetime

mydb =  None
mycursor = None
locations = []
chosen_location = ""

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

    locations = []
    #get all existing location_ids
    sql = ("SELECT location_id FROM locations")
    mycursor.execute(sql)
    result = mycursor.fetchall()
    for line in result:
        locations.append(line[0])

def get_map(input_str: str):
    global chosen_location
    chosen_location = input_str

    return filter_by_location(input_str)

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
        events["id"] = row[0]
        events["name"] = row[1]
        events["loc"] = row[2]
        events["desc"] = row[3]
        events["club"] = row[4]
        events["start_time"] = row[6]
        events["end_time"] = row[7]
    return events

def add_timetable():
    pass

def save_user_event(user_id: int, event_id: int):
    sql = "INSERT INTO user_events (user_id, event_id) VALUES (%s, %s)"
    val = (user_id, event_id)
    mycursor.execute(sql, val)
    mydb.commit()

def get_user_events(user_id: int):
    sql = "SELECT * from events INNER JOIN user_events ON user_events.event_id = events.event_id WHERE user_events.user_id = %s;"
    val = (user_id)
    mycursor.execute(sql, val)
    result = mycursor.fetchall()
    return result_to_eventlist(result)

if __name__ == "__main__":
    startup()
    print(get_map())