//Query 4
//Classifica quartieri per numero cristiani mostrando elenco numero crimini commessi nel quartiere nel Dicembre 2015.

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
            "_id" : {
                "name" : "$Crime_Information.borough.Name",
                "number_of_christians" : "$Crime_Information.borough.Christian"
            },
            "crime" : {
                $sum : 1
            }
        }
        
    },
    {
        $sort : {
            "_id.number_of_christians" : 1
        }
    },
    {
        $project : {
            "_id" : 0,
            "borough" : "$_id.name",
            "crime" : 1
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
        $lookup: {
            from : "borough",
            localField : "Crime_Information.borough",
            foreignField : "Name",
            as : "boroughInformation"
        }
    },
    {
        $unwind : "$boroughInformation"
    },
    {
        $group : {
            "_id" : {
                "name" : "$Crime_Information.borough",
                "number_of_christians" : "$boroughInformation.Christian"
            },
            "crime" : {
                $sum : 1
            }
        }
    },
    {
        $sort : {
            "_id.number_of_christians" : 1
        }
    },
    {
        $project : {
                "_id" : 0,
                "borough" : "$_id.name",
                "crime" : 1
            }
    }
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")

