const express = require('express');
const router = express.Router();
const Register = require('../models/register');
const Login = require('../models/login');
const Message = require('../models/message');
const MessageReceived = require('../models/messageReceived');
const MessageSent = require('../models/messageSent');
const Response = require('../models/response');


// Traer todos los usuarios registrados
router.get('/users/Register',function(req,res){
    
    //res.send({type:"GET"});
    Register.find({}).then(function(register){
      res.send(register); 
      
    });
});

/*router.get('users/register',function(req,res,next){
  
  var userTemp=req.body;
  res.send(userTemp);
  console.log(userTemp);
  
});|
*/

// Registrarse por primera vez
/*router.post('/users/register',function(req,res,next){
    // Creo una instancia del modelo usuario y lo guardo en la base
    // Create es un método de mongo
   //  Como es un promise, una vez guardado, me devuelve lo que envié a guardar
  console.log("Entre");
   Register.create(req.body).then(function(register){
      res.send(register);
  });
  
                                 
    
    console.log(req.body);
    //var user = new ususarioModelo();  
    //res.send({type:'POST',
    //          name: req.body.name,
    //          age: req.body.age
     //        });
             
});
*/

// Registración por body con validación de existencia previa
router.post('/users/register',function(req,res,next){
  
  Register.findOne({"name":req.body.name},function (err,exist){
      if(err){
        res.status(500).send("Hubo un error con la registración");
      }
      if(exist){
        res.status(505).send("Usuario existente, debe loguearse");
      }
      else if(!exist){
        Register.create(req.body).then(function(register){
          res.status(200).send(register);  
        });
      }
  });
   
});

router.get('/users/login/:name',function(req,res,next){
  Register.findOne({"name":req.params.name}, function (err,exist){
    if(err){
      res.status(500).send("Hubo un error en el login");
    }    
    if(!exist){
      res.status(501).send("No existe el usuario, deberá registrarse");
    }
    else if(exist){
      res.status(200).send("Bienvenido "+req.params.name+" al chat");
    }
    
    });
});

router.put('/users/:id',function(req,res,next){
  // El userID que ingreso en el navegador es reemplazado por el indicado por el body a través del postman
  User.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    User.findOne({_id:req.params.id}).then(function(user){
       res.send(user);                                          
    });       
  });
});


router.delete('/users/:id',function(req,res,next){
  User.findOneAndDelete({_id:req.params.id}).then(function(user){
    res.send(user);
  }) 
  res.send({type:'DELETE'});
    
});

module.exports = router;