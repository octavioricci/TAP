const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var functions = require('../MyModules/myFunctions');
const Register = require('../models/register');
const Login = require('../models/login');
const Message = require('../models/message');
const MessageReceived = require('../models/messageReceived');
const MessageSent = require('../models/messageSent');
const Response = require('../models/response');



router.get('/users',function(req,res,next){	
  Register.find({}).then(function(listOfUsers){	
    var arrayUsers = [];
    
    for (var i=0; i<listOfUsers.length; i++){
      arrayUsers.push({
        name: listOfUsers[i].name,
        email: listOfUsers[i].email
      });
    }
    res.send(arrayUsers);                     
  }).catch(function(err){
      res.status(500).send('Hubo un error recuperando los usuarios', error.message);
  });
});  


// Aqui me devuelve el usuario que corresponde al token que le paso a través del postman
// Poniendo en password: 0 evitamos que salga. es una projection
router.get('/users/me', functions.verifyToken, function(req, res,next) {
    
  Register.findOne({_id:req.id},{password:0},function(err,user){
    if(err) return res.status(500).send("Hubo un problema para encontrar el usuario");
    if(!user) return res.status(404).send("No se pudo encontrar el usuario");
    res.status(200).send(user);
  });
});

router.get('/myMessages',functions.verifyToken,function(req,res){
  
  Register.findOne({_id:req.id}).then(function(user){
   
     Message.find({to:user.name},function(err,exist){
        if(err){
          res.status(401).send("Error al recuperar los mensajes");
        }
        if(!exist){
          res.status(200).send("El usuario "+userTemp.name+" no tiene mensajes");
        }
        else if(exist){
          res.status(200).send(exist);
        }
      });
    });
});

/*
router.get('/myNewMessages', functions.verifyToken, function(req,res){
  
  Register.find({"name":req.body.to},function (err,exist){
      if(err){
        res.status(500).send("Hubo un error");
      }
      if(!exist){
        res.status(505).send("El usuario al que quiere enviar el mensaje no existe");
      }
      // Si el usuario no existe, procedo a registrarlo
      else if(exist){
        MessageReceived.create({
          status:"OK",
          messageFrom:req.body.from,
          messageTo:req.body.message,
          wasRead:"NO",
          message:req.body.message,
          sent:req.body.dateSend
        }).
        Message.create(req.body).then(function(message){
          res.send(message);
        });
      }
           
    });
  
});
*/

// Registro de usuarios
router.post('/users/register',function(req,res,next){
      
  Register.findOne({"name":req.body.name},function (err,exist){
      if(err){
        res.status(500).send("Hubo un error con la registración");
      }
      if(exist){
        res.status(505).send("Usuario existente, debe loguearse");
      }
      // Si el usuario no existe, procedo a registrarlo
      else if(!exist){
       
        // encripto la password que paso en el body (esto lo hago por postman, por ej)
        var hashPassword = bcrypt.hashSync(req.body.password,8);
        req.password = hashPassword;
        
        Register.create(req.body,function(err, exist){
          
          //Error si ya está registrado el email 
          if(err){
            res.status(401).send("Error "+ err);
          }
          else{
            console.log(register);
            res.status(200).send({status:"ok", message:"Se ha registrado correctamente"});
          }
         
        });
      } // Cierre else if(!exist)
    });
   
});
 
router.post('/messages',functions.verifyToken, function(req,res,next){
   
    
     Register.find({"name":req.body.to},function (err,exist){
      if(err){
        res.status(500).send("Hubo un error");
      }
      if(!exist){
        res.status(505).send("El usuario al que quiere enviar el mensaje no existe");
      }
      // Si el usuario no existe, procedo a registrarlo
      else if(exist){
       
        Message.create(req.body).then(function(message){
          res.send(message);
        });
      }
           
    });
    
});



router.post('/users/login',function(req,res){
  Register.findOne({"email":req.body.email}, function(err,exist){
    if(err) return res.status(500).send({status:error,message:"Hubo un error de login"});
    if(!exist) return res.status(404).send({status:Error,message:"Usuario no existe, debe registrarse"});
   
    
    
      // Si el usuario existe, valido que la clave sea válida, comparando la que envío por body con la almacenada
      // en la bbbdd
      var pass = req.body.password;
      var compareHashPassword = bcrypt.compareSync(pass,exist.password);
         
        // Si la clave no coincide con la almacenada en la bbdd
        if (!compareHashPassword) return res.status(401).send({status:"error",message:"password inválida"});        
        
        // Si la clave existe, genero 
        var token = jwt.sign({ id: exist._id }, config.secret, {
           expiresIn: 3600 
          
         });// exira en 2 minutos
         res.status(200).send({status:"Ok", message:"Login correcto", token: token});
  
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


router.delete('/users/:email',function(req,res,next){
   Register.findOneAndDelete({email:req.params.email}).then(function(user){
    res.send(user);
  }) 
     
});

module.exports = router;