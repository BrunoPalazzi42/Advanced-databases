// Query 2
// Classifica anni per furti effettuati.


// Embedded

var prima = new Date()
db.collection.aggregate([
    {
        $group : {
            "_id": "$Crime_Information.year",
            "crime" : {
                $sum : 1
            }
        }
    },
    {
        $sort : {
            "crime" : 1
        }
    },
    {
        $project : {
            "_id" : 0,
            "crime" : 1,
            "year" : "$_id"
        }
    }    
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")



// Reference

var prima = new Date()
db.crimes.aggregate([
    {
        $group : {
            "_id": "$Crime_Information.year",
            "crime" : {
                $sum : 1
            }
        }
    },
    {
        $sort : {
            "crime" : 1
        }
    },
    {
        $project : {
            "_id" : 0,
            "crime" : 1,
            "year" : "$_id"
        }
    }    
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")
