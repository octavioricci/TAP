var express=require('express');
var bodyParser=require('body-parser');
var app=express();
const mongoose=require('mongoose');
var url = require('url');
var modules = require('./MyModules/functions');

const MONGO_URL = 'mongodb://tapuser:Banco123@ds243212.mlab.com:43212/tap';

//const MongoClient = require('mongodb').MongoClient;


// Middleware que toma los datos del body y los parsea a json
app.use(bodyParser.json());
// Inicializo los endpoints, previamente que fueron importados de modulos
app.use('/api',require('./routes/api'));

// Me conecto con mongoose
mongoose.connect(MONGO_URL);
mongoose.Promise = global.Promise;



//const Usuario = mongoose.model('usuario',usuarioSchema);
// Connect to MongoDb Cloud Database
/*
MongoClient.connect(MONGO_URL, (err,db) => {
  if(err) {
    return console.log(err);
  }
  else{
    console.log("Conexión a Mongo OK");
  }});
*/

  /*
// Insert on Database
  db.collection('chat').insertOne(
     {
        title: 'Prueba',
        text: 'Esto es una prueba'

     },
    function(err,res){
      if(err){
        db.close();
        return console.log(err);
      }      
      else
        db.close();
    }
  );
*/
//app.user(express.static('public'));
/*
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html')
    
});

app.get('/usuarios', function (req, res){
  
    if(req.query !=={}){
      console.log("Entre");
      var parsed = url.parse(req.url, true).query; 
      var from = parsed.from;
      var to = parsed.to;
      var message = parsed.message;
      
      console.log("from: "+from+" to: "+to+" message: "+message);
    }
 
app.post('register',function(req,res)){
  
             

}
    
    /*if(from == "" || message == "" || to == ""){
         res.write(modules.error());
    }
    else{
        res.write(modules.greetings());
    }
  
  
res.end();  
});
*/

app.listen(8080,function(){
    console.log("Server listening on por 8080")
});



