var jwt = require('jsonwebtoken');
var config = require('../config/config');

exports.verifyToken = function (req,res,next){
  
  const token = req.headers['authorization'];
  
  if(!token) return res.status(401).send({auth:false,message:"No autorizado!, no se ha pasao el token de validación", status:401});  
  
  // Si se ha pasado token
  jwt.verify(token,config.secret,function(err,decoded){
    if(err){
      return res.status(401).send({auth:false, message:"Hubo un error con la validación del token o expiró el tiempo", status:401});
      // Si se validó bien el token
    } 
      
      req.body = req.body; // con esto no pierdo el body que recibi y lo puede utilizar el siguiente middleware o route que sea el next
      req.id = decoded.id; // también envío el id para que el siguiente middleware o route lo pueda utilizar
      
    next();
    
  });
 
}

exports.verifyLogin=function(login){
  try {
    jwt.verify(login.lastToken, config.secret)
      console.log("Devuelvo lastToken: "+login.lastToken);
      return true
  } catch(err) {
      return false
  }    
  
}


