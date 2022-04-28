var express = require('express');
var app= express();
var bodyParser = require('body-parser');
const { response } = require('express');
const res = require('express/lib/response');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients =[
  {
    "id":"232kak", 
    "text":"Eggs"
  },
  {
    "id":"244kak",
    "text":"milk"
  },
  {
    "id":"344rsk",
    "text":"bacon"
  },
  {
    "id":"555gdk",
    "text":"frog legs"
  }

];

app.get('/ingredients', function(req, res){
    res.send(ingredients);
});

app.post('/ingredients', function(req, res) {
   var ingredient = req.body;
   if(!ingredient || ingredient.text === ""){
     res.status(500).send({error:"your ingredient must have text"});
   
} else {
    ingredients.push(ingredient);
    res.status(200).send(ingredients);
   }

});

app.put('/ingredients/:ingredientId', function(req, res){
    
var ingredientId = req.params.ingredientId;
var newText = req.body.text;

if (!newText || newText === "") {
    res.status(500).send({error:"you must provide ingredient text"})
} else{
    var objectFound = false;
for (var i = 0 ; i < ingredients.length ; i++) {
var ing = ingredients[i];

     if (ing.id === req.params.ingredientId) {
       ingredients[i].text = newText;
       objectFound = true;
       break;
     }
  }
  if (!objectFound) {
      res.status(500).send({error:"ingredient id not found"});
  }else {
  res.send(ingredients);
  }
}

});



app.listen(3000, function(){
   console.log('First API running at port 3000...');
});