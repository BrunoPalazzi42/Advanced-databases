#!/usr/bin/env python3

import csv
from pymongo import MongoClient
from time import time

client = MongoClient('localhost', 27017)
client.drop_database("LondonCrimesEmbedded")
db = client["LondonCrimesEmbedded"]
collection = db["crimes"]
# crimefile = open('/home/bruno/Desktop/Progetto Basi/london_crime_by_lsoa.csv')
boroughfile = open('/home/bruno/Desktop/Progetto Basi/london_religion_per_borough.csv')
data = []
#crime_reader = csv.DictReader(crimefile, delimiter=",")
borough_reader = csv.DictReader(boroughfile, delimiter=",")
start_time = time()
i=0
for borough in borough_reader:
    crimefile = open('/home/bruno/Desktop/Progetto Basi/london_crime_by_lsoa.csv')
    crime_reader = csv.DictReader(crimefile, delimiter=",")
    for row in crime_reader:
        if(borough["Area"].lower() == row["borough"].lower()):
            Borough_information = {
                                    "Name": borough["Area"],
                                    "All people" : int(borough["All people"]),
                                    "Christian" : int(borough["Christian"]),
                                    "Buddhist" : int(borough["Buddhist"]),
                                    "Hindu" : int(borough["Hindu"]),
                                    "Jewish" : int(borough["Jewish"]),
                                    "Muslim" : int(borough["Muslim"]),
                                    "Sikh" : int(borough["Sikh"]),
                                    "Other religion" : int(borough["Other religion"]),
                                    "No religion" : int(borough["No religion"]),
                                    "Religion not stated" : int(borough["Religion not stated"]),
                                    }
            Crime_Information = {
                                    "lsoa_code": row["lsoa_code"],
                                    "borough": Borough_information,
                                    "major_category": row["major_category"],
                                    "minor_category": row["minor_category"],
                                    "year": int(row["year"]),
                                    "month": int(row["month"]),
                                }
            row["Crime_Information"] = Crime_Information
            del row["lsoa_code"]
            del row["borough"]
            del row["major_category"]
            del row["minor_category"]
            del row["year"]
            del row["value"]
            del row["month"]
            data.append(row)
    print(i)
    # crimefile = open('/home/bruno/Desktop/Progetto Basi/london_crime_by_lsoa.csv')
    # crime_reader = csv.DictReader(crimefile, delimiter=",")
    del borough["Area"]
    del borough["All people"]
    del borough["Christian"]
    del borough["Buddhist"]
    del borough["Hindu"]
    del borough["Jewish"]
    del borough["Muslim"]
    del borough["Sikh"]
    del borough["Other religion"]
    del borough["No religion"]
    del borough["Religion not stated"]
db.collection.insert_many(data)
print(time() - start_time)
