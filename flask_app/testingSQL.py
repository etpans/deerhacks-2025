import mysql.connector
import datetime

mydb =  None
mycursor = None
locations = []
location = "IB"
start_date = "2025-02-14"
end_date = "2025-02-15"
start_time = None
# date = datetime.datetime.today().strftime("%Y-%m-%d")
# start_time = datetime.datetime.today().strftime("%H:%M:%S")
end_time = None
search = []

def startup():
    global mydb, mycursor, locations
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
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

def get_map():
    global location, start_date, end_date, start_time, end_time, search
    #count number of events for each location_id
    location_freq = []
    for location in locations:
        sql = ("SELECT COUNT(*) AS `Number of events` FROM events WHERE event_loc = %s")
        val = [location]
        mycursor.execute(sql, val)
        result = mycursor.fetchall()
        location_freq.append((f"{location} : {result[0][0]}"))

    result = get_filters(location, start_date, end_date, start_time, end_time, search)
    return [location_freq, result]

def get_filtered_data(given_location: str, given_start_date: str, given_end_date: str, given_start_time: str, given_end_time: str):
    global location, start_time, end_time, start_date, end_date
    location = given_location
    start_date = given_start_date
    end_date = given_end_date
    start_time = given_start_time
    end_time = given_end_time
    return get_filters(location, start_date, end_date, start_time, end_time, search)

def get_search_data(query: str):
    global search, location
    if query != "undefined":
        search = query.split()
    
    location = "IB"
    print(location)
    print(start_date)
    print(end_date)
    print(start_time)
    print(end_time)
    print(search)
    return get_filters(location, start_date, end_date, start_time, end_time, search)

def get_filters(location: str, start_date: str, end_date: str, start_time: str, end_time: str, search: list[str]):
    drop = "DROP TABLE IF EXISTS filtered_table"
    mycursor.execute(drop)
    create = ("CREATE TABLE filtered_table (\
	event_id INT PRIMARY KEY,\
	event_name VARCHAR(50),\
    event_loc VARCHAR(4),\
    event_desc VARCHAR(250),\
    event_club VARCHAR(50),\
    event_date DATE,\
    event_start_time TIME,\
    event_end_time TIME \
    );")
    mycursor.execute(create)
    if location is not None:
        sql = ("INSERT INTO filtered_table SELECT * FROM events WHERE event_loc = %s")
        val = [location]
        mycursor.execute(sql, val)
    else:
        sql = ("INSERT INTO filtered_table SELECT * FROM events")
        mycursor.execute(sql)
    mydb.commit()
    if start_date is not None:
        sql = ("DELETE FROM filtered_table WHERE event_date < %s")
        val = [start_date]
        mycursor.execute(sql, val)
    mydb.commit()
    if end_date is not None:
        sql = ("DELETE FROM filtered_table WHERE event_date > %s")
        val = [end_date]
        mycursor.execute(sql, val)
    mydb.commit()
    if start_time is not None:
        sql = ("DELETE FROM filtered_table WHERE TIME(event_start_time) < TIME(%s)")
        val = [start_time]
        mycursor.execute(sql, val)
    mydb.commit()
    if end_time is not None:
        sql = ("DELETE FROM filtered_table WHERE TIME(event_end_time) > TIME(%s)")
        val = [end_time]
        mycursor.execute(sql, val)
    mydb.commit()
    if len(search) > 0:
        # Build the WHERE clause dynamically for multiple words
        conditions = ' OR '.join([f"event_desc LIKE '%{word}%'" for word in search]) + ")"
        sql = "DELETE FROM filtered_table WHERE NOT (" + conditions
        mycursor.execute(sql)
    mydb.commit()
    mycursor.execute("SELECT * FROM filtered_table")
    print("search"+str(mycursor.fetchall()))
    select_sql = "SELECT * FROM filtered_table"
    mycursor.execute(select_sql)
    
    result = mycursor.fetchall()

    return result_to_eventlist(result)
    
def result_to_eventlist(result: list[tuple]):
    events = []
    for row in result:
        event = {}
        event["name"] = row[1]
        event["loc"] = row[2]
        event["desc"] = row[3]
        event["club"] = row[4]
        event["date"] = row[5]
        event["start_time"] = seconds_to_time(row[6])
        event["end_time"] = seconds_to_time(row[7])
        events.append(event)
    return events

def format_time(timeDelta: datetime.timedelta):
    return timeDelta

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


def testing_stuff():
    v = "datetime.date(1,1,1)"
    print(v)
    # print(get_search_data("midterm"))
    # print(get_filters(None, "2025-02-14", None, None, ["midterm", "draw"]))

def seconds_to_time(time_delta: datetime.timedelta):

    seconds = time_delta.seconds

    hours = seconds // 3600
    minutes = seconds % 3600 // 60
    seconds = seconds % 60
 
    return f"{hours:02}:{minutes:02}:{seconds:02}"
    
if __name__ == "__main__":
    # print(result_to_eventlist([(1,"DH", "make trains", "train modeling club", "18:00:00", "20:00:00"), (1,"DH", "make trains", "train modeling club", "18:00:00", "20:00:00")]))
    startup()
    testing_stuff()
    # startup()
    # print(get_map())
