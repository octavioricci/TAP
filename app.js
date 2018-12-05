var express=require('express');
var bodyParser=require('body-parser');
var cors = require('cors');
const router = require('./routes/api');
var app=express();
const mongoose=require('mongoose');
var url = require('url');
var modules = require('./MyModules/myFunctions');

app.options('*', cors());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Configuro la conexión a MONGO en la nube
const MONGO_URL = 'mongodb://tapuser:Banco123@ds243212.mlab.com:43212/tap';

// Conecto y seteo promise
mongoose.connect(MONGO_URL, function(err, success){
  if (err){
    console.log("Error al conectarse a la base: " + err.message);
  }
  if (success){
    cosole.log("Se conectó exitosamente a la bbdd");
  }
});
mongoose.Promise = global.Promise;





// Middleware que toma los datos del body y los parsea a json
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());



// Monto el router como un middleware en el path /api
// Es el equivalente a : 
//                      const router = require('./routes/api');
//                      app.use('api'/,router);
app.use('/api',require('./routes/api'));



// Midleware que antes de cada peticion al router muestra la fecha 
app.use(function(req,res,next){
  console.log("API Chat V0.1 - Date: ", new Date());
  next();
});

app.listen(3000,function(){
    console.log("Server listening on por 3000")
});



