// Query 1
//  Classifica decrescente quartieri per numero cristiani

// Embedded

db.collection.ensureIndex({"Crime_information.borough":1})

var prima = new Date()
db.collection.aggregate([
    {
        $group: {
            _id : {
                "name" : "$Crime_Information.borough.Name",
                "number_of_christians" : "$Crime_Information.borough.Christian"
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
            "name" : "$_id.name",
            "number_of_christians" : "$_id.number_of_christians"
        }
    }
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")




// Reference

var prima = new Date()
db.borough.aggregate([
    {
        $group : {
            _id : {
                "name" : "$Name",
                "number_of_christians" : "$Christian"
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
            "name" : "$_id.name",
            "number_of_christians" : "$_id.number_of_christians"
        }
    }
])
var dopo = new Date()
var finale = dopo - prima
print("took " + finale / 1000 + "seconds")

