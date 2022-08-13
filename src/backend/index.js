//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

var devices = require('./datos.json')
//=======[ Main module code ]==================================================
app.post('/actualizar', function(req,res){
    console.log("Llegue al servidor");
    console.log(req.body);
    //Validar los datos que llegan id!=undefined y state!= undefined

//Buscar en la base de datos
    res.send("llego")
});

app.get('/devices/', function(req, res, next) {
    console.log("Alguien pidio divices!");
    setTimeout(function(){
        res.send(JSON.stringify(devices)).status(200);
    }, 2000);
});

app.get('/devices/:id', function(req, res) {
    console.log("Alguien pidio un dispositivo con el id: "+ req.param('id'));
    var deviceSolicitado
    for (var i = 0; i < devices.length; i++) {        
        if(req.param('id')==devices[i].id){
            deviceSolicitado=devices[i]
        }
    }
    setTimeout(function(){
        res.send(JSON.stringify(deviceSolicitado)).status(200);
    }, 2000);
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
