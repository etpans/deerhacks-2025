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

def get_map(input_str: str):
    global chosen_location
    chosen_location = input_str

    return get_filters(input_str)

def get_filters(location: str, date: datetime.date, start_time: datetime.time, end_time: datetime.time, search: list[str]):
    drop = ("DROP TABLE filtered_table")
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
    if location:
        sql = ("INSERT INTO filtered_table SELECT * FROM events WHERE event_loc = %s")
        val = [location]
        mycursor.execute(sql, val)
    if date:
        sql = ("DELETE FROM filtered_table WHERE date = %s")
        val = [date]
        mycursor.commit(sql, val)
    if start_time:
        sql = ("DELETE FROM filtered_table WHERE start_time < %s")
        val = [start_time]
        mycursor.commit(sql, val)
    if end_time:
        sql = ("DELETE FROM filtered_table WHERE end_time > %s")
        val = [end_time]
        mycursor.commit(sql, val)

    if search:
        # Build the WHERE clause dynamically for multiple words
        conditions = ' OR '.join([f"club_desc LIKE %s" for _ in search])
        
        sql = f"""
            DELETE FROM filtered_table
            WHERE NOT ({conditions});
        """
        
        # Add wildcards (%) to search for words inside `club_desc`
        val = [f"%{category}%" for category in search]
    
    mycursor.commit(sql, val)
    select_sql = "SELECT * FROM filtered_table"
    mycursor.execute(select_sql)
    
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