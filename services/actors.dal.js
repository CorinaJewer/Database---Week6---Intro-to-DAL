const dal = require("./pdb");

//get all actors.
var getActors = function() {
  if(DEBUG) console.log("actors.dal.getActors()");
  return new Promise(function(resolve, reject) {

    const sql = "SELECT actor_id, first_name, last_name FROM actor \
      ORDER BY actor_id DESC LIMIT 7;"

    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the actors.dal.getActors() function");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

var getActorById = function(theId) {
  if(DEBUG) console.log("actors.dal.getActorById()");
  if (DEBUG)console.log(`The actor id is ${theId}`);

  return new Promise(function(resolve, reject) {

    const sql = "SELECT actor_id, first_name, last_name FROM actor \
      WHERE actor_id = $1;"

    dal.query(sql, [theId], (err, result) => { // theID passed in as a parameter now and pg will change the $1 to whatever parameter has been passed in URL.
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the actors.dal.getActorById() function");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 

}

module.exports = {
  getActors,
  getActorById
}