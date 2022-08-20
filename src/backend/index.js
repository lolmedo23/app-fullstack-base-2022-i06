//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
const {connection, readDevices, readDeviceID, insertDevice, updateState, removeDevice} = require("./mysql-connector")

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));


//=======[ Main module code ]==================================================
app.post("/actualizar",function(req,res){
    if(req.body.id!=undefined&& req.body.state!=undefined){
        updateState(connection, {state:req.body.state, id:req.body.id},
        (result)=>{
            res.json(result);
        });
    }else{
        res.send("ERROR Parametros invalidos");
    }   
});

//Obtener todos los dispositivos de la base de datos
app.get('/devices/', function(req, res) {
    readDevices(connection,
        (result)=>{
            res.json(result);
        });
});

//Obtener un dispositivo de la base de datos con el id indicado
app.get('/deviceId/', function(req, res) {
    if(req.body.id!=undefined){
        readDeviceID(connection, {id: req.body.id},
        (result)=>{
            res.json(result);
        });
    }else{
        res.status(400).send("Error parametros invalidos")
    }    
});

app.post('/insertDevice', (req,res)=>{
    if(req.body.name!=undefined && req.body.description!=undefined && req.body.state!=undefined && req.body.type!=undefined){
        insertDevice(connection, {name:req.body.name, description:req.body.description, state:req.body.state, type:req.body.type},
        (result)=>{
            res.json(result);
        });
    }else{
        res.status(400).send("Error parametros invalidos")
    }
});

//eliminar el dispositivo con id recibido por parametro
app.post("/removeDevice", (req,res)=>{
    if(req.body.id!=undefined){
        removeDevice(connection, {id:req.body.id},
        (result)=>{
            res.json(result);
        });
    }else{
        res.status(400).send("Error parametros invalidos")
    }
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
