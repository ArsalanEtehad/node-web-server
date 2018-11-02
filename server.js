const hbs = require('hbs') //handle bars
const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

var options = {
  extensions: ['htm', 'html']
}

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase() + '!!';
})


//ORDERS MATTER!
//THIS AVOID US GOING TO ANY PAGE AFTER IT!!!
//app.use is how we register a midleware and it takes a function
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page',
//     pContent: 'this page is under repair'
//   })
//   // next();
// })

app.use(express.static(__dirname + '/public',options))

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} , ${req.url}, ${req}`
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    console.log('unable to append the log to the file');
  })
  next()
})

app.get('/', (req, res)=> {
  res.render('home.hbs',{
    pageTitle: 'Home Page in HTML(Mustache)',
    pContent: 'Just a Welcome msg'
  })
})

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page in HTML(Mustache)',
    pContent: 'this is about page'
  }) //'render' will render the current 'view engine'
})

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage: 'Bad Request'
  })
})

app.get('/portfolio',(req, res)=>{
  res.render('portfolio.hbs', {
    pageTitle: "Arsalan's Portfolio",
    pContent: 'page content goes here'
  })
})

app.get('/forecast', (req, res)=>{
  res.render('forecast.hbs',{
    pageTitle: "weather forecast",
    pContent: 'the app runs here CURRENTLY USING GET'
  })
})



app.listen(port, ()=>{
  console.log(`Server is running on port:${port} ...`);
})
