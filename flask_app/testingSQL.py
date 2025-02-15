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
        password="1234",
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
        events["id"] = row[0]
        events["name"] = row[1]
        events["loc"] = row[2]
        events["desc"] = row[3]
        events["club"] = row[4]
        events["start_time"] = row[5]
        events["end_time"] = row[6]
    return events

if __name__ == "__main__":
    startup()
    print(get_map())