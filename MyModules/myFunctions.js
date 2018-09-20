var jwt = require('jsonwebtoken');
var config = require('../config/config');

exports.verifyToken = function (req,res,next){
  
  const token = req.headers['authorization'];
  
  if(!token) return res.status(403).send({auth:false,message:"No se pasó token"});  
  
  // Si se ha pasado token
  jwt.verify(token,config.secret,function(err,decoded){
    if(err){
      return res.status(500).send({auth:false, message:"Hubo un error con la validación del token"});
      // Si se validó bien el token
    } 
      req.id=decoded.id;
      next(req);
    
  });
 
}