const dal = require("./pdb");

//get all films for all actors.
var getAllFilmsForAllActors = function() {
  if(DEBUG) console.log("films.dal.getFilms()");
  return new Promise(function(resolve, reject) {

    /*const sql = `SELECT title, release_year, rating FROM film ORDER BY title ASC LIMIT 25`;*/

    /*const sql = `SELECT first_name, last_name, title, release_year, rating FROM film\
    JOIN film_actor USING (film_id)\
    JOIN actor USING (actor_id)\
    ORDER BY last_name DESC LIMIT 25;`*/

    const sql = `SELECT * FROM public.actor_films\
    ORDER BY last_name DESC LIMIT 25;`

    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the films.dal.getAllFilmsForAllActors() function");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};


var getFilmById = function(theFilmId) {
  if(DEBUG) console.log("films.dal.getFilmById()");
  return new Promise(function(resolve, reject) {

    const sql = `SELECT * FROM actor_films \
      WHERE film_id = $1 \
      ORDER BY last_name ASC;`

    dal.query(sql, [theFilmId], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};


module.exports = {
  getAllFilmsForAllActors, getFilmById
}