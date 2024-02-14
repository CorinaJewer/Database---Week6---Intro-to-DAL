const express = require ('express');
const app = express();

global.DEBUG = 'true';

const { getActors, getActorById } = require('./services/actors.dal')

const { getAllFilmsForAllActors, getFilmById } = require('./services/films.dal')

const port = 3000; 

app.set('view engine', 'ejs');

app.get('/', (request,response)=>{
    if (DEBUG)console.log('root route');
    response.send('The route for the sites root page.');
})

app.get('/about', (request,response)=>{
    if (DEBUG)console.log('/about route');
    response.send('The about route.');
})


/*(app.get('/page', (request,response)=>{
    console.log('/page route');
    response.render('page');
})

app.get ('/darth', (request,response)=>{
    console.log ('/darth route');
    response.render('darth', {name:'Darth Vader'});  // pass in parameters
})*/

app.get ('/actors', async(request,response)=>{
    if (DEBUG)console.log ('/actors route');
    let theActors = await getActors(); // fetch actors from postgresql
    response.write(JSON.stringify(theActors)); 
    response.end();
})

app.get ('/films', async(request,response)=>{
    if (DEBUG)console.log ('/films route');
    let theFilms = await getAllFilmsForAllActors(); // fetch films from postgresql
    response.write(JSON.stringify(theFilms)); 
    response.end();
})

app.get('/films/:id', async(request,response)=>{
    if (DEBUG)console.log('/films/:id route');
    let theFilm = await getFilmById(request.params.id); // fetch film from postgresql
    response.write(JSON.stringify(theFilm));
    response.end();

})

app.get('/actors/:id', async(request,response)=>{
    if (DEBUG)console.log('/actor/:id route');
    //response.send(`The id is ${request.params.id}`);
    //getActorById(request.params.id);
    let theActor = await getActorById(request.params.id); // fetch actor from postgresql
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(theActor));
    response.end();

})

app.use((request,response)=>{
    response.status(404).write('404 - Page not found');
    response.end();
})

app.listen(port, ()=>{
    console.log(`Express app running on port ${3000}.`)
});