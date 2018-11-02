const hbs = require('hbs') //handle bars
const express = require('express');

var app = express();

app.set('view engine', 'hbs');


//http://expressjs.com/en/4x/api.html#express.static
var options = {
  extensions: ['htm', 'html']
}
//cool tool for any public page! no need to use get for each of the tabs. just put all in the specified directory.
//try localhost:3000/help and localhost:3000/nothelp  :)
app.use(express.static(__dirname + '/public',options))

app.get('/', (req, res)=> {
  res.render('home.hbs',{
    pageTitle: 'Home Page in HTML(Mustache)',
    currentYear: new Date().getFullYear(),
    pContent: 'Just a Welcome msg'
  })
})

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page in HTML(Mustache)',
    currentYear: new Date().getFullYear()
  }) //'render' will render the current 'view engine'
})

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Bad Request'
  })
})

app.listen(3000, ()=>{
  console.log('Server is running on port:3000 ...');
})
