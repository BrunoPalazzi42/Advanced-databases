//Query 6
//Coppia (major_cartegory, minor_category) di crimini più commessi nel 2015
var prima = new Date()
db.collection.aggregate([ 
    {
        $match : {
            "Crime_Information.year" : 2015
        }
    },
    {
        $group : {
            "_id" : {
                "minor_category" : "$Crime_Information.minor_category",
                "major_category" : "$Crime_Information.major_category"
            },
            "crime" : {
                $sum : 1
            }
        }
        
    },
    {
        $sort : {
            "crime" : -1
        }
    },
    {
        $limit : 1
    },
    {
        $project : {
            "_id" : 0,
            "minor_category" : "$_id.minor_category",
            "major_category" : "$_id.major_category",
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
            "Crime_Information.year" : 2015
        }
    },
    {
        $group : {
            "_id" : {
                "minor_category" : "$Crime_Information.minor_category",
                "major_category" : "$Crime_Information.major_category"
            },
            "crime" : {
                $sum : 1
            }
        }
        
    },
    {
        $sort : {
            "crime" : -1
        }
    },
    {
        $limit : 1
    },
    {
        $project : {
            "_id" : 0,
            "minor_category" : "$_id.minor_category",
            "major_category" : "$_id.major_category",
            "crime" : 1
        }
    }
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")

