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
/*devices = [
    { 
        'id': 1, 
        'name': 'Lampara 1', 
        'description': 'Luz living', 
        'state': 1, 
        'type': 1, 
    },
    { 
        'id': 2, 
        'name': 'Ventilador 1', 
        'description': 'Ventilador Habitacion', 
        'state': 1, 
        'type': 2, 
    },
];
*/

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
    //ACA validar los parametros de entrada, y buscar el id en el json
    console.log("Alguien pidio un dispositivo con el id: "+ req.param('id'));
    setTimeout(function(){
        res.send(JSON.stringify(devices)).status(200);
    }, 2000);
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
