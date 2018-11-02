var express = require('express');
var app = express();

//http://expressjs.com/en/4x/api.html#express.static
var options = {
  extensions: ['htm', 'html']
}

app.use(express.static(__dirname + '/public',options))

app.get('/', (req, res)=> {
  // res.send('<p>Hello Express!</p>')
  res.send({
    name: 'Arsalan',
    position: 'Entry Level Developer',
    FavePlayers: [
      'Messi',
      'Suarez',
      'Kroos',
      'Ter Stegan',
      'Jordi Alba',
      {
          sub: ['Coutiniho',
                'Dembele',
                'Mbappe',
                'Nueuer',
                'Arthor Melo'
                ]
      }
    ]
  })
})

app.get('/about', (req, res)=>{
  res.send('<h1>About Page</h1>')
})

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Bad Request'
  })
})

app.listen(3000, ()=>{
  console.log('Server is running on port:3000 ...');
})
