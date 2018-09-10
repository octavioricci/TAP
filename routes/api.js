const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario'); 


router.get('/users',function(req,res,next){
    res.send({type:'GET'});
    
});

router.post('/users',function(req,res,next){
    // Creo una instancia del modelo usuario y lo guardo en la base
    // Create es un método de mongo
   //  Como es un promise, una vez guardado, me devuelve lo que envié a guardar
  console.log("Entre");
   Usuario.create(req.body).then(function(usuario){
    res.send(usuario);
  }).catch(next);
  
                                 
    
    console.log(req.body);
    //var user = new ususarioModelo();  
    //res.send({type:'POST',
    //          name: req.body.name,
    //          age: req.body.age
     //        });
             
});

router.put('/users/:id',function(req,res,next){
    res.send({type:'PUT'});
});


router.delete('/users/:id',function(req,res,next){
    res.send({type:'DELETE'});
});

module.exports = router;