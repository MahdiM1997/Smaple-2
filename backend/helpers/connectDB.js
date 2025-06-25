const { MongoClient } = require("mongodb");
// Notice all the variables such as uri,dbName,db,client are all global(outside of getDatabase function) why? Because we don't want to create a new MongoClient or db each time getDatabase is imported and called from other files, so ı make these variables global.

// a variable having global scope, meaning, it can be accessed from anywhere inside the programme

const uri = "mongodb://localhost:27017";
// protocol = mongodb     domainName=localhost        port=27017
//To connect to database,this is the standard protocol mongodb:// and default path is localhost and port is 27017

// DataBase Name
const dbName = "medicalportal";

let db = null;

const client = new MongoClient(uri);
// we didnt create these codes above inside the function because we dont want to run these codes every time getDatabase function is called .

async function getDatabase() {
  try {
    // Connect to the MongoDB server,if something goes wrong, we catch the error in 'catch' block

    await client.connect();
    // Select the database and assign it to the global db variable, remember we only want one db instance, we don't want to create a new instance each time we connect to the DB
    db = client.db(dbName);
    // you should'nt write "let db = ..." cause u dont want to create that variable every time this code runs.
    return db;
    // this db is all we need and it is the output of our code
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
module.exports = { getDatabase, client };
// via client we can check that if the connection is still open with the database and if it is still open and we are done with database we can close the connection .
// we shouldnt keep the connection open and we should close it after we are done with database this is a general rule  because it can cause performance issues .
