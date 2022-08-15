//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');
const {readDevices, insertDevice, updateState, updateDescription, removeDevice} = require("./mysql-connector")

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));


var connection = utils.connection


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

app.get('/insertDevice', (req,res)=>{
    insertDevice(connection, { name:req.body.name ,description:req.body.description,state:req.body.state,type:req.body.type},
    (result)=>{
        res.json(result);
    });
});

app.get('/updateDescription', (req,res)=>{
    updateDescription(connection, {id: req.body.id, description:req.body.description},
    (result)=>{
        res.json(result);
    });
});

//eliminar el dispositivo con id recibido por parametro
app.get("/removeDevice", (req,res)=>{
    console.log("/removeDevice")
    if(req.body.id!=undefined){
        console.log("remove Device: "+ req.body.id)
        removeDevice(connection, {id:req.body.id},
        (result)=>{
            res.json(result);
        });
    }
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
