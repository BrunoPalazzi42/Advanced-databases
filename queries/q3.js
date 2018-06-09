// Query 3
// Trovare il quartiere con il maggior numero di furti nel mese di Dicembre 2015

// Embedded

var prima = new Date()
db.collection.aggregate([
    {
        $match : {
            "Crime_Information.month" : 12,
            "Crime_Information.year" : 2015
        }
    },   
    {
        $group : {
                    "_id" : "$Crime_Information.borough.Name",
                    "furti" : {$sum:1}
                }
    },
    {
        $sort : {
            "furti": -1
        }
    },
    {
        $project : 
            {
                _id : 0,
                borough : "$_id",
                furti : "$furti"
            }
    }
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")


//Reference

var prima = new Date()
db.crimes.aggregate([
    {
        $match : {
            "Crime_Information.month" : 12,
            "Crime_Information.year" : 2015
        }
    },   
    {
        $group : {
                    "_id" : "$Crime_Information.borough",
                    "furti" : {
                        $sum : 1
                    }
                }
    },
    {
        $sort : {
            "furti": -1
        }
    },
    {
        $project : {
                _id : 0,
                borough : "$_id",
                furti : "$furti"
            }
    }
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")