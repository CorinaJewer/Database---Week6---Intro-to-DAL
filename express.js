const express = require ('express');
const app = express();

global.DEBUG = 'true';

const { getActors, getActorById } = require('./services/actors.dal')

const port = 3000; 

app.set('view engine', 'ejs');

app.get('/', (request,response)=>{
    console.log('root route');
    response.send('The route for the sites root page.');
})

app.get('/about', (request,response)=>{
    console.log('/about route');
    response.send('The about route.');
})

app.get('/page', (request,response)=>{
    console.log('/page route');
    response.render('page');
})

app.get('/page', (request,response)=>{
    console.log('/page route');
    response.render('page');
})

app.get ('/darth', (request,response)=>{
    console.log ('/darth route');
    response.render('darth', {name:'Darth Vader'});  // pass in parameters
})

app.get('/actors/:id', async(request,response)=>{
    console.log('/actor/:id route');
    //response.send(`The id is ${request.params.id}`);
    //getActorById(request.params.id);
    let theActor = await getActorById(request.params.id); // fetch actor from postgresql
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(theActor));
    response.end()

})

app.listen(port, ()=>{
    console.log(`Express app running on port ${3000}.`)
});