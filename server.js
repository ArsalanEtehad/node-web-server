const hbs = require('hbs') //handle bars
const express = require('express');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

var options = {
  extensions: ['htm', 'html']
}
app.use(express.static(__dirname + '/public',options))

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase() + '!!';
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

app.listen(3000, ()=>{
  console.log('Server is running on port:3000 ...');
})
