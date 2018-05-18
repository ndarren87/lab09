var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'SELECT * FROM resume;';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getinfo = function(resume_id, callback){
    var query = 'CALL resume_getinfo(?)';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO resume (account_id, resume_name) VALUES (?, ?)';

    var queryData = [params.account_id, params.resume_name];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE resume SET account_id = ?, resume_name = ? WHERE resume_id = ?';
    var queryData = [params.account_id, params.resume_name, params.resume_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.delete = function(params, callback){
    var query = 'DELETE FROM resume WHERE resume_id = ?';
    var queryData = [params.resume_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};