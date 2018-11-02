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

//app.use is how we register a midleware and it takes a function
app.use((req, res, next)=>{
  //it's like getting in middle of the program and trying to run whatever is inside this.
  //and it won't let the server proceed untill next() is called:
  var now = new Date().toString();
  //for further express methods:
  //http://expressjs.com/en/4x/api.html#req
  //http://expressjs.com/en/4x/api.html#res
  console.log(`${now}: ${req.method} , ${req.url}`)
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

app.listen(3000, ()=>{
  console.log('Server is running on port:3000 ...');
})
