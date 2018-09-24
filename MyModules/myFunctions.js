var jwt = require('jsonwebtoken');
var config = require('../config/config');

exports.verifyToken = function (req,res,next){
  
  const token = req.headers['authorization'];
  
  if(!token) return res.status(403).send({auth:false,message:"No se pasó token"});  
  
  // Si se ha pasado token
  jwt.verify(token,config.secret,function(err,decoded){
    if(err){
      return res.status(500).send({auth:false, message:"Hubo un error con la validación del token o expiró el tiempo"});
      // Si se validó bien el token
    } 
      
      req.body = req.body; // con esto no pierdo el body que recibi y lo puede utilizar el siguiente middleware o route que sea el next
      req.id = decoded.id; // también envío el id para que el siguiente middleware o route lo pueda utilizar
      
    next();
    
  });
 
}


