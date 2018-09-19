const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
const Register = require('../models/register');
const Login = require('../models/login');
const Message = require('../models/message');
const MessageReceived = require('../models/messageReceived');
const MessageSent = require('../models/messageSent');
const Response = require('../models/response');

function verifyToken(req,res,next){
  const token = req.headers['authorization'];
  
  if(!token) return res.status(403).send({auth:false,message:"No se pasó token"});  
  
  // Si se ha pasado token
  jwt.verify(token,config.secret,function(err,decoded){
    if(err){
      return res.status(500).send({auth:false, message:"Hubo un error con la validación del token"});
      // Si se validó bien el token
    } 
      req.id=decoded.id;
      next();
    
  });
}



// Aqui me devuelve el usuario que corresponde al token que le paso a través del postman
// Poniendo en password: 0 evitamos que salga. es una projection
router.get('/users/me', verifyToken, function(req, res,next) {
  
  /*var token = req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    Register.findById(decoded.id, {password: 0},function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      //res.status(200).send(user);
      next(user);
    });
  });
  */
  Register.findOne({_id:req.id},{password:0},function(err,user){
    if(err) return res.status(500).send("Hubo un problema para encontrar el usuario");
    if(!user) return res.status(404).send("No se pudo encontrar el usuario");
    res.status(200).send(user);
  });
});

/*router.post('/users/post',verifyToken, (req,res) =>{
  
  
  jwt.verify(req.token, config.secret, (err,authData) => {
    if(err){
      res.status(403).send("Hubo un error"); 
      
    }
    else{
      res.send({message: 'Post created'}, authData);
    }
  });

});
*/
// Register con jsonwebtoken
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
        
        Register.create({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email
        }).then(function(register){
            
            // Acá creo el token
          // Genera un payload, que contendría el register.id
          // Junto con la secret key y el payload genera el token 
            var token = jwt.sign({id: register._id}, config.secret, {
              expiresIn: 86400 // expira en una hora
            });
          
          res.status(200).send({status:"ok", message:"Se ha registrado correctamente"});
          
        });
      } // Cierre else if(!exist)
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

/*
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
*/




// Login utilizando el name desde la barra del navegador
router.get('/users/login/:name',function(req,res,next){
  Register.findOne({"name":req.params.name}, function (err,exist){
    if(err){
      res.status(500).send("Hubo un error en el login");
    }    
    if(!exist){
      res.status(404).send("No existe el usuario, deberá registrarse");
    }
    else if(exist){
      res.status(200).send("Bienvenido "+req.params.name+" al chat");
     
    }
    
    });
});


// 
router.post('/messages', function(req,res,next){
   
    var token = req.headers['authorization'];
    
    if(!token) return res.status(403).send({auth:false,message:"No se pasó token"});  
    jwt.verify(token,config.secret,function(err,decoded){
      if(err){
        return res.status(500).send({auth:false, message:"Hubo un error con la validación del token"});
      // Si se validó bien el token
      } 
      // Si el token de quien envia el mensaje está bien
      // Busco si existe a quien se lo quiero enviar 
     });
     
      var body = req.body;
      // TODO: A partir de aca, se pierde el req.body???
      Register.findOne({"name":req.body.to},function (err,exist){
      if(err){
        res.status(500).send("Hubo un error");
      }
      if(!exist){
        res.status(505).send("El usuario al que quiere enviar el mensaje no existe");
      }
      // Si el usuario no existe, procedo a registrarlo
      else if(exist){
        Message.create(body).then(function(message){
          res.send(message);
        });
      }
           
  });
         
       
        /*Message.create({
          from: req.body.from,
          to: req.body.to,
          message: req.body.message,
          dateSend: req.body.dateSend*/          
        //Message.create(req.body).then(function(message){
            
            // Acá creo el token
          // Genera un payload, que contendría el register.id
          // Junto con la secret key y el payload genera el token 
       // Register.findOne({_id:req.id},{password:0},function(err,user){
       //   if(err) return res.status(500).send("Hubo un problema para encontrar el usuario");
        //  if(!user) return res.status(404).send("No se pudo encontrar el usuario");
        //  res.status(200).send(user);
        //});    
          
          
          
        //});
    
    //if(err) return res.status(500).send("Hubo un problema para encontrar el usuario");
    //if(!user) return res.status(404).send("No se pudo encontrar el usuario");
    
  
    // Si el usuario que va a enviar el mensaje tiene ok su token
    /*Message.create(req.body).then(function(register){
      res.send(register);
      res.status(200).send(user);
    });*/
  //});
  
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
           expiresIn: 86400 
          
         });// exira en 2 minutos
         res.status(200).send({status:"Ok", message:"Login correcto", token: token});
  
  });
});


router.get('/users/logout', function(req,res){
  res.status(200).send({token:null,message:"Se deslogueó con éxito"});
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