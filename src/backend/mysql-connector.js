//=======[ Settings, Imports & Data ]==========================================

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'mysql-server',
    port     : '3306',
    user     : 'root',
    password : 'userpass',
    database : 'smart_home'
});

//=======[ Main module code ]==================================================

connection.connect(function(err) {
    if (err) {
        console.error('Error while connect to DB: ' + err.stack);
        return;
    }
    console.log('Connected to DB under thread ID: ' + connection.threadId);
});

function readDevices(connection, callback){
    connection.query('SELECT * FROM Devices', function(err, result) {
        if(err) throw err;
        callback(result);
    });
}

function readDeviceID(connection, data, callback){
    let updateQuery = "SELECT * FROM Devices WHERE id = ?"
    let query = mysql.format(updateQuery, [data.id ]);
    connection.query(query, function(err, result){
        if (err) throw err;
        callback(result);
    });
}


function insertDevice(connection, data, callback){
    let insertQuery = 
    "INSERT INTO Devices (id, name,description,state,type) VALUES (?,?,?,?,?)";
    let query = mysql.format(insertQuery,[data.id, data.name, data.description, data.state, data.type]);
    connection.query(query, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

function updateState(connection, data, callback){
    let updateQuery = "UPDATE Devices SET state = ? WHERE id = ?"
    let query = mysql.format(updateQuery, [data.state,data.id ]);
    connection.query(query, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

function removeDevice(connection, data, callback){
    let removeQuery = "DELETE FROM Devices WHERE id = ?"
    let query = mysql.format(removeQuery, [data.id]);
    connection.query(query, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

module.exports = {connection, readDevices, readDeviceID, insertDevice, updateState, removeDevice};



//=======[ End of file ]=======================================================
