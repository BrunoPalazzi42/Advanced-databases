//Query 5
//Classifica decrescente per numero ebrei dei quartieri con più ebrei che buddisti mostrando numero crimini commessi nel quartiere nel Dicembre 2015.
var prima = new Date()
db.collection.aggregate([
    {
        $match : {
            "Crime_Information.month" : 12,
            "Crime_Information.year" : 2015,
            $expr : {
                $gt : ["Crime_Information.borough.Jewish", "Crime_Information.borough.Buddhist"]
            }
        }
    }, 
    {
        $group : {
            "_id" : {
                "name" : "$Crime_Information.borough.Name",
                "number_of_jewish" : "$Crime_Information.borough.Jewish"
            },
            "crime" : {
                $sum : 1
            }
        }
        
    },
    {
        $sort : {
            "_id.number_of_jewish" : 1
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
            "Crime_Information.year" : 2015,
            $expr : {
                $gt : ["borough.Jewish", "borough.Buddhist"]
            }
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
                "number_of_jewish" : "$boroughInformation.Jewish"
            },
            "crime" : {
                $sum : 1
            }
        }
    },
    {
        $sort : {
            "_id.number_of_jewish" : 1
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

